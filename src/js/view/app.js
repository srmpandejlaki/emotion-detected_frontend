import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const route = routes.find((route) => route.path === url);
    if (!route) {
      console.error("route tidak ditemukan!");
      return;
    }

    await route.afterRender();
  }
}

export default App;