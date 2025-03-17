class SideBar extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallcak() {
    this.render();
  }

  render() {}
}

customElements.define('side-bar', SideBar);