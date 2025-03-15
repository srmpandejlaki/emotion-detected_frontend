import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ content, button, drawer }) {
    this._content = content;
    this._button = button;
    this._drawer = drawer;

    this._appShell();
  }

  _appShell() {
      DrawerInitiator.init({
        content: this._content,
        button: this._button,
        drawer: this._drawer,
      });
    }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const route = routes.find((route) => route.path === url);

      if (!route) {
        console.error(`Route "${url}" tidak ditemukan.`);
        return;
      }

      if (typeof route.afterRender === "function") {
        await route.afterRender();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat merender halaman:", error);
    }
  }
}

export default App;