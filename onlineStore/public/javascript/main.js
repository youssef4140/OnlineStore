const route = async (page) => {
  const result = await fetch(`${page}.html`);

  const pageHtml = await result.text();

  const pageContent = document.getElementById("page-content");
  pageContent.innerHTML = pageHtml;

  const pageJs = await import(`/javascript/${page}.js`);
  pageJs.default();
};

route(`index`);
