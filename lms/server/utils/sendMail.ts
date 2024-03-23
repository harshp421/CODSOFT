import nodemailer,{ Transporter}from 'nodemailer';
import ejs from 'ejs'
import path from 'path';
require('dotenv').config();

interface IMailOptions {
    email: string;
    subject: string;
    template: string;
    data:{[key:string]:any}
}

const sendMail = async (options: IMailOptions):Promise<void> => {
    const transporter:Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port:parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    } );
   
    const data = {
        from:process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        html: await ejs.renderFile(path.join(__dirname, `../mails/${options.template}`), options.data)
    }
    await transporter.sendMail(data);
}

export default sendMail;