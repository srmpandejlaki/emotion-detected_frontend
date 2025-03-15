import App from './view/app';

const main = new App ({
  content: document.querySelector('#main'),
  button: document.querySelector('#toggle'),
  drawer: document.querySelector('#drawer'),
});

window.addEventListener('hashchange', () => {
  main.renderPage();
});

window.addEventListener('load', () => {
  main.renderPage();
});