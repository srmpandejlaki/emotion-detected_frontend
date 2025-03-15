import Login from "../view/pages/login";
import Register from "../view/pages/register";
import Admin from "../view/pages/admin";
import User from "../view/pages/user";

const routes = {
  '/': Login,  // Default route to login page if no route specified in URL
  '/login': Login,
  '/register': Register,
  '/admin': Admin,
  '/user': User,
};

export default routes;