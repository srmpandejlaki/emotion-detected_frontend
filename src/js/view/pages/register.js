const Register = {
  async render() {
    return `
      <div class="registerSection">
        <h2>Register</h2>
        <form action="" class="register">
          <input type="text" placeholder="Username">
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Password">
        </form>
        <button>Register</button>
      </div>
    `;
  }
};

export default Register;