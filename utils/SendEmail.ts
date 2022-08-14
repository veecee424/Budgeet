import nodemailer from 'nodemailer';
import User from '../db/models/User';
import { customError } from '../utils/ResponseFormatter';
import { User as UserType, EmailTemplate as EmailTemplateType } from '../custom_types/Custom';
import EmailTemplate from '../db/models/EmailTemplate';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

const sendEmail = async (userId: any, templateId: string, body: any) => {
    try {
        // Check if passed in UserId is valid
        const USER: UserType | null = await User.findById(userId, null, {lean:true});
        if (!USER) throw new customError('User does not exist', 400);

        // Check if passed in emailType is valid
        const EMAIL_TEMPLATE: EmailTemplateType | null = await EmailTemplate.findById(templateId, null, {lean:true});
        if (!EMAIL_TEMPLATE) throw new customError('Email template not found.', 400);
        
        // Create test account for defaults
        const testAccount = await nodemailer.createTestAccount();
        // Create mail transporter
        const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.ethereal.email";
        const EMAIL_PORT = Number(process.env.EMAIL_PORT) || 587;
        const EMAIL_USER = process.env.EMAIL_USER || testAccount.user;
        const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || testAccount.pass;
       
        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        });
        
        // point to the template folder
        const hbsConfig = {
            viewEngine: {
              extName: '.hbs',
              partialsDir: path.join(__dirname, '../views/'),
              layoutsDir: path.join(__dirname, '../views/'),
              defaultLayout: ''
            },
            viewPath: path.join(__dirname, '../views/'),
            extName: '.hbs'
        };
        // use a template file with nodemailer
        transporter.use('compile', hbs(hbsConfig));

        const mailOptions = {
            from: 'chatwitval10@yahoo.com',
            to: USER.email,
            subject: EMAIL_TEMPLATE.subject,
            template: EMAIL_TEMPLATE.templateName,
            context: {
                ...body
            }
        }
        
        const mail = await transporter.sendMail(mailOptions);

        // Log mail
        console.log(mail)
    } catch (e:any) {
        // Log error
        console.log(e)
    }
}

export default sendEmail;