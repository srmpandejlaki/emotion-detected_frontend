const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLocaleLowerCase();
    const spliteUrl = this._urlSplitter(url);
    return this._urlCombiner(spliteUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1);
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlParts = url.split("/");
    return {
      resource: urlParts[1] || null,
      id: urlParts[2] || null,
      verb: urlParts[3] || null,
    };
  },

  _urlCombiner(urlParts) {
    return (urlParts.resource ? `/${urlParts.resource}` : '/')
    + (urlParts.id ? '/:id' : '')
    + (urlParts.verb ? `/${urlParts.verb}` : '');
  },
};

export default UrlParser;