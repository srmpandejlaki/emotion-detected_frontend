import App from './view/app';

const main = new App ({
  content: document.querySelector('#main'),
});

window.addEvenListenter('haschange', () => {
  window.scrollTo(0, 0);
  main.renderPage();
});