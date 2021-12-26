const links = document.querySelectorAll('link[rel="import"]');
links.forEach((link) => {
  let template = link.import.querySelector("template");
  let clone = document.importNode(template.content, true);
  let target = clone.querySelector(".template").dataset.tab;
  document.getElementById(target).appendChild(clone);
});