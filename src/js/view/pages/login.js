const Login = {
  async render() {
    return `
      <div class="loginSection">
        <h2>Login</h2>
        <form action="" class="login">
          <input type="text" placeholder="Username">
          <input type="password" placeholder="Password">
        </form>
        <button>Login</button>
        <a href="/register">Belum punya akun? Klik disini untuk Register.</a>
      </div>
    `;
  },

  async afterRender() {}
};

export default Login;