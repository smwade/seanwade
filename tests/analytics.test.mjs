import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../public/analytics.js',import.meta.url),'utf8');
function browser({dnt,tool}={}){
 const scripts=[],events=[];
 const window={umami:{track:(...args)=>events.push(args)}};
 const document={currentScript:{dataset:{tool}},head:{appendChild:x=>scripts.push(x)},createElement:()=>({dataset:{},addEventListener(){}}),addEventListener(){}};
 const ctx={window,document,navigator:{doNotTrack:dnt},location:{hostname:'seanwade.com',origin:'https://seanwade.com',pathname:'/tools/investment-calculator/',search:'?salary=secret',hash:'#private'},URL,Element:class{}};
 vm.runInNewContext(code,ctx);return {window,scripts,events};
}
test('browser hook removes financial URLs, titles, referrer details and identities before sending',()=>{
 const {window,scripts}=browser({tool:'investment_calculator'});
 const out=window.siteAnalyticsBeforeSend('event',{url:'/secret?salary=123',title:'private',id:'email',referrer:'https://example.com/private?token=secret',data:{salary:123,email:'private'}});
 assert.equal(out.url,'/tools/investment-calculator/');assert.equal(out.title,'');assert.equal(out.id,undefined);assert.equal(out.referrer,'https://example.com');assert.deepEqual(JSON.parse(JSON.stringify(out.data)),{tool:'investment_calculator'});
 assert.equal(scripts[0].dataset.performance,'true');assert.equal(scripts[0].dataset.excludeSearch,'true');assert.equal(window.siteAnalyticsBeforeSend('identify',{}),false);
});
test('Do Not Track prevents script installation',()=>assert.equal(browser({dnt:'1'}).scripts.length,0));
test('calculator preserves local scenario before loading the common tracker',()=>{
 const calculator=readFileSync(new URL('../public/tools/analytics.js',import.meta.url),'utf8');
 const seen=[],ctx={document:{currentScript:{dataset:{tool:'investment_calculator'}},createElement:()=>({dataset:{}}),head:{appendChild:tag=>seen.push(tag)}},window:{},location:{pathname:'/tools/investment-calculator/',search:'?salary=123',hash:'#secret'},history:{replaceState:(...args)=>seen.push(args)}};
 vm.runInNewContext(calculator,ctx);assert.equal(ctx.window.calculatorSearch,'?salary=123');assert.equal(seen[0][2],'/tools/investment-calculator/');assert.equal(seen[1].src,'/analytics.js');
});
