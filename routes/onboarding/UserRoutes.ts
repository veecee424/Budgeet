import { Router } from "express";
const UserRoutes: Router = Router();
import register from '../../services/onboarding/register';
import login from '../../services/onboarding/login';
import logout from '../../services/onboarding/logout';
import isAuthenticated from '../../middlewares/isAuthenticated';
import changePassword from '../../services/onboarding/changePassword';

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', isAuthenticated, logout);
UserRoutes.post('/change-password', isAuthenticated, changePassword);

export default UserRoutes;