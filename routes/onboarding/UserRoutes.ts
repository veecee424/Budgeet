import { Router } from "express";
const UserRoutes: Router = Router();
import register from '../../services/onboarding/register';
import login from '../../services/onboarding/login';
import logout from '../../services/onboarding/logout';
import isAuthenticated from '../../middlewares/isAuthenticated';
import changePassword from '../../services/onboarding/changePassword';
import forgottenPassword from '../../services/onboarding/forgottenPassword';
import forgottenPasswordReset from '../../services/onboarding/forgottenPasswordReset';

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', isAuthenticated, logout);
UserRoutes.post('/change-password', isAuthenticated, changePassword);
UserRoutes.post('/forgotten-password', forgottenPassword);
UserRoutes.post('/forgotten-password-reset', forgottenPasswordReset);

export default UserRoutes;