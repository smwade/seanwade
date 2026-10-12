// Public site ID, not a credential. The collection gateway repeats these privacy filters.
(() => {
  if (window.siteAnalyticsLoaded || !['seanwade.com', 'www.seanwade.com'].includes(location.hostname)) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  window.siteAnalyticsLoaded = true;
  const config = document.currentScript?.dataset || {};
  const tool = ['investment_calculator', 'domain_investing'].includes(config.tool) ? config.tool : undefined;
  window.siteAnalyticsBeforeSend = (type, payload) => {
    if (!['event', 'performance'].includes(type)) return false;
    let referrer = '';
    try { referrer = new URL(String(payload.referrer || '')).origin; } catch { /* direct */ }
    const data = {};
    if (tool) data.tool = tool;
    return {...payload, url:location.pathname, referrer, title:'', id:undefined, data:Object.keys(data).length ? data : undefined};
  };
  const pending = [];
  const track = name => {
    try { if (window.umami) window.umami.track(name, tool ? {tool} : undefined); else if (pending.length < 20) pending.push(name); } catch { /* never interrupt a user action */ }
  };
  const tag = document.createElement('script');
  tag.src = 'https://collect.ordinaryrocket.com/script.js';
  tag.async = true;
  Object.assign(tag.dataset, {websiteId:'e0c7fdf4-32bc-44dd-91c3-57aeccbd58ae', domains:'seanwade.com,www.seanwade.com', excludeSearch:'true', excludeHash:'true', doNotTrack:'true', performance:'true', beforeSend:'siteAnalyticsBeforeSend'});
  tag.addEventListener('load', () => { if(tool)track('tool_open'); for(const name of pending.splice(0))track(name); });
  document.head.appendChild(tag);
  document.addEventListener('click', event => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    let name;
    try {
      const url = new URL(link.href, location.origin);
      if (link.dataset.analyticsEvent === 'resume_download') name = 'resume_download';
      else if (url.protocol === 'mailto:') name = 'contact_click';
      else if (url.hostname === 'github.com') name = 'github_click';
      else if (url.hostname === 'pulshealth.com' || url.hostname === 'labs.seanwade.com') name = 'project_click';
    } catch { return; }
    if(name)track(name);
  });
  if(tool){
    let used=false;
    const use=()=>{if(!used){used=true;track('tool_interaction');}};
    document.addEventListener('change',event=>{if(event.isTrusted && event.target instanceof Element && event.target.matches('input,select'))use();});
    document.addEventListener('click',event=>{
      if(!event.isTrusted || !(event.target instanceof Element))return;
      if(event.target.closest('.mode-btn,.comm-btn'))use();
      if(event.target.closest('#shareBtn')){use();track('tool_share');}
      if(event.target.closest('#exportBtn,#downloadBtn')){use();track('tool_export');}
    },{capture:true});
  }
})();
