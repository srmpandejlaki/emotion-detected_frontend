import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const route = routes.find((route) => route.path === url);

      if (!route) {
        console.error(`Rute "${url}" tidak ditemukan.`);
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