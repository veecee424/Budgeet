import { Router } from "express";
const UserRoutes: Router = Router();
import register from '../../services/onboarding/register';
import login from '../../services/onboarding/login';
import logout from '../../services/onboarding/logout';
import isAuthenticated from '../../middlewares/isAuthenticated';

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', isAuthenticated, logout);

export default UserRoutes;