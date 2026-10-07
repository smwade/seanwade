import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = (await readFile(new URL("./router.js", import.meta.url), "utf8"))
  .replace('import cf from "cloudfront";', "");

function router(entries = {}) {
  const context = vm.createContext({
    cf: { kvs: () => ({ get: async (key) => {
      if (!(key in entries)) throw new Error("Missing key");
      return entries[key];
    } }) },
  });
  return vm.runInContext(`${source}\nhandler`, context);
}

test("index aliases redirect without changing encoded or repeated query values", async () => {
  for (const uri of ["/index.html", "/blog/index.html", "/tools/investment-calculator/index.html"]) {
    const response = await router()({ request: { uri, querystring: {
      source: { value: "a%2Fb", multiValue: [{ value: "a%2Fb" }, { value: "c+d" }] },
      empty: { value: "" },
    } } });
    assert.equal(response.statusCode, 301);
    assert.equal(response.headers.location.value, uri.replace(/index\.html$/, "") + "?source=a%2Fb&source=c+d&empty=");
  }
});

const projects = {
  "/legacy-guide.html": "/misc/food/guide.html",
  "project:food": JSON.stringify({ prefix: "/misc/food", entry: "guide.html" }),
};

test("legacy aliases retain their exact protected object mapping", async () => {
  const request = { uri: "/legacy-guide.html", querystring: {} };
  assert.equal((await router(projects)({ request })).uri, "/misc/food/guide.html");
});

test("project folders redirect to a slash and keep custom entries and assets", async () => {
  assert.equal((await router(projects)({ request: { uri: "/food", querystring: {} } })).headers.location.value, "/food/");
  assert.equal((await router(projects)({ request: { uri: "/food/", querystring: {} } })).uri, "/misc/food/guide.html");
  assert.equal((await router(projects)({ request: { uri: "/food/images/dinner.jpg", querystring: {} } })).uri, "/misc/food/images/dinner.jpg");
});

test("portfolio routes and missing projects pass through unchanged", async () => {
  for (const uri of ["/", "/blog/", "/sitemap.xml", "/_next/static/chunks/app.js", "/not-found/"]) {
    const request = { uri, querystring: {} };
    assert.equal(await router(projects)({ request }), request);
    assert.equal(request.uri, uri);
  }
});
