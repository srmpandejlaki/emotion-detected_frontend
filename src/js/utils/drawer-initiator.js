const DrawerInitiator = {
  init({ content, button, drawer }) {
    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  }
};

export default DrawerInitiator;