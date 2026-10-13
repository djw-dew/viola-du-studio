(() => {
  'use strict';
  const data = window.STUDIO;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const make = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  };
  const externalLink = (value) => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  };
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  $$('[data-name]').forEach((el) => { el.textContent = data.name; });
  $$('[data-email]').forEach((el) => { el.textContent = data.email; });
  $$('[data-email-link]').forEach((el) => { el.href = `mailto:${data.email}`; });
  $$('[data-copy-email]').forEach((el) => { el.setAttribute('aria-label', `复制邮箱 ${data.email}`); });
  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3600);
  }
  function fallbackCopy(value) {
    const input = make('textarea'); input.value = value; input.setAttribute('readonly', '');
    input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    document.body.append(input); input.select();
    try { return document.execCommand('copy'); } finally { input.remove(); }
  }
  $$('[data-copy-email]').forEach((button) => button.addEventListener('click', async () => {
    let copied = false;
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(data.email); copied = true; } } catch { /* 使用备用复制方式。 */ }
    if (!copied) { try { copied = fallbackCopy(data.email); } catch { copied = false; } }
    button.focus({ preventScroll: true });
    showToast(copied ? '邮箱已复制，期待你的来信 ♡' : `请手动复制邮箱：${data.email}`);
  }));
  if ($('#resume-headline')) {
    const resume = data.resume;
    $('#resume-headline').textContent = resume.headline;
    $('#resume-introduction').textContent = resume.introduction;
    for (const key of ['education', 'experience']) {
      const container = $(`#${key}-list`); container.replaceChildren();
      resume[key].forEach((item) => {
        const entry = make('section', 'resume-item'); const heading = make('div', 'resume-item-header');
        heading.append(make('h4', '', item.title));
        if (item.period) heading.append(make('span', '', item.period));
        entry.append(heading);
        if (item.subtitle) entry.append(make('p', 'resume-subtitle', item.subtitle));
        if (item.description) entry.append(make('p', '', item.description));
        container.append(entry);
      });
    }
    $('#skills-list').replaceChildren(...resume.skills.map((skill) => make('span', 'skill-tag', skill)));
    $('#highlights-list').replaceChildren(...resume.highlights.map((item) => make('li', '', item)));
    const pdfPanel = $('#full-resume');
    const openPdf = () => { if (location.hash === '#full-resume') pdfPanel.open = true; };
    openPdf(); window.addEventListener('hashchange', openPdf);
    $$('a[href="#full-resume"]').forEach((link) => link.addEventListener('click', () => { pdfPanel.open = true; }));
  }
  if ($('#demo-grid')) {
    const container = $('#demo-grid'); container.replaceChildren();
    data.demos.forEach((demo, index) => {
      const article = make('article', `demo-card demo-card-${index + 1}`);
      const cover = make('div', 'demo-cover');
      const image = make('img'); image.src = demo.image; image.alt = demo.imageAlt; image.width = 800; image.height = 460;
      cover.append(image);
      const url = externalLink(demo.url); const live = demo.status === 'live' && Boolean(url);
      const status = make('span', `demo-status ${live ? 'is-live' : 'is-soon'}`, live ? '● LIVE DEMO' : '◷ COMING SOON');
      cover.append(status);
      const copy = make('div', 'demo-card-copy');
      const meta = make('div', 'demo-card-meta'); meta.append(make('span', '', demo.category), make('span', '', String(index + 1).padStart(2, '0')));
      const title = make('h2', 'demo-card-title', demo.title);
      const description = make('p', 'demo-card-description', demo.description);
      const tags = make('div', 'demo-tags'); demo.tags.forEach((tag) => tags.append(make('span', '', tag)));
      const bottom = make('div', 'demo-card-bottom');
      if (live) {
        const link = make('a', 'small-button', '打开 Agent ↗'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `在新标签页打开${demo.title}`);
        bottom.append(link, make('span', 'demo-open-note', '在新标签页打开'));
      } else {
        const button = make('button', 'small-button coming-soon-button', '即将开放 ♡'); button.type = 'button'; button.disabled = true;
        bottom.append(button, make('span', 'demo-open-note', '链接待定，敬请期待'));
      }
      copy.append(meta, title, description, tags, bottom); article.append(cover, copy); container.append(article);
    });
  }
})();
