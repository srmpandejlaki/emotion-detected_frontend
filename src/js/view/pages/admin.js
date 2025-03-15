const Admin = {
  async render() {
    return `
      <div>
        <button id="toggle">X</button>
        <nav id="#drawer">test</nav>
      </div>
    `;
  }, 

  async afterRender() {}
};

export default Admin;