import { Router } from "express";
const UserRoutes: Router = Router();
import register from '../../services/onboarding/Register';
import login from '../../services/onboarding/Login';
import logout from '../../services/onboarding/Logout';
import isAuthenticated from '../../middlewares/IsAuthenticated';
import changePassword from '../../services/onboarding/ChangePassword';
import forgottenPassword from '../../services/onboarding/ForgottenPassword';
import forgottenPasswordReset from '../../services/onboarding/ForgottenPasswordReset';
import editProfile from '../../services/onboarding/EditProfile';

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', isAuthenticated, logout);
UserRoutes.post('/change-password', isAuthenticated, changePassword);
UserRoutes.post('/forgotten-password', forgottenPassword);
UserRoutes.post('/forgotten-password-reset', forgottenPasswordReset);
UserRoutes.post('/edit-profile', editProfile);

export default UserRoutes;