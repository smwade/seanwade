// Keep shared financial scenarios in the calculator, never in analytics URLs.
(() => {
  const script = document.currentScript;
  const tool = script.dataset.tool;
  const path = script.dataset.path;
  window.calculatorSearch = window.location.search;
  if (window.location.search || window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  const pageLocation = window.location.origin + path;
  let pageReferrer = '';
  try {
    const referrer = new URL(document.referrer);
    if (referrer.protocol === 'https:' || referrer.protocol === 'http:') {
      pageReferrer = referrer.origin + referrer.pathname;
    }
  } catch { /* Direct visits have no referrer. */ }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-82TGJ7K92V', {
    send_page_view: false,
    page_location: pageLocation,
    page_referrer: pageReferrer,
  });
  window.gtag('event', 'page_view', {
    page_location: pageLocation,
    page_referrer: pageReferrer,
  });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-82TGJ7K92V';
  document.head.appendChild(tag);

  function track(name, mode) {
    const parameters = {
      tool_id: tool,
      page_location: pageLocation,
      page_referrer: pageReferrer,
    };
    if (['fixed', 'historical', 'goal', 'pct'].includes(mode)) {
      parameters.calculator_mode = mode;
    }
    window.gtag('event', name, parameters);
  }

  let used = false;
  function trackUse() {
    if (used) return;
    used = true;
    track('calculator_use');
  }
  document.addEventListener('change', (event) => {
    if (event.isTrusted && event.target instanceof Element && event.target.matches('input, select')) trackUse();
  });
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const modeButton = event.target.closest('.mode-btn, .comm-btn');
    if (modeButton && !modeButton.classList.contains('active')) {
      trackUse();
      track('calculator_mode_change', modeButton.dataset.mode);
    }
    if (event.target.closest('#shareBtn')) {
      trackUse();
      // Counts a share attempt; no shared URL or scenario values are reported.
      track('calculator_share_click');
    }
  }, { capture: true });
})();
