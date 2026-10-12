// Preserve shared calculator state locally before initializing privacy-filtered analytics.
(() => {
  const source = document.currentScript;
  window.calculatorSearch = location.search;
  if (location.search || location.hash) history.replaceState(null, '', location.pathname);
  const tag = document.createElement('script');
  tag.src = '/analytics.js';
  tag.dataset.tool = source.dataset.tool;
  tag.dataset.path = source.dataset.path;
  tag.defer = true;
  document.head.appendChild(tag);
})();
