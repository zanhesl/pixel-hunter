export class AbstractView {
  template() {}

  render(pageTemplate) {
    let template = document.createElement(`template`);
    template.innerHTML = pageTemplate;
    return template.content;
  }

  bind() {}

  get element() {}
}
