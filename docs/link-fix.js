/*
 * GitHub Pages serves repository Markdown files as files, not as a lesson reader.
 * Convert every learning-card Markdown link into the corresponding GitHub-rendered
 * document so every option in the portal opens a readable document.
 */
(function () {
  const REPO = 'https://github.com/Narsing-s/mulesoft-end-to-end-guide/blob/main/';

  function normalize(path) {
    const clean = path.split('#')[0].split('?')[0];
    if (!clean.endsWith('.md')) return null;
    const parts = clean.split('/');
    const resolved = [];
    for (const part of parts) {
      if (!part || part === '.') continue;
      if (part === '..') resolved.pop();
      else resolved.push(part);
    }
    return resolved.join('/');
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http:') || href.startsWith('https:')) return;

    const path = normalize(href);
    if (!path) return;

    event.preventDefault();
    const hash = href.includes('#') ? href.slice(href.indexOf('#')) : '';
    window.location.href = REPO + path + hash;
  });
})();
