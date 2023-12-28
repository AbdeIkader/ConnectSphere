import nodemailer from "nodemailer";
import { htmlCode } from "./html.js";

export const sendEmail = async (options, token,protocol, host,action) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.email,
        pass: process.env.emailpass,
      },
    });
  
    // console.log(process.env.email);
    // console.log(process.env.emailpass);
  
    try {
      const info = await transporter.sendMail({
        from: `"Social-Media" <${process.env.email}>`,
        to: options.email,
        subject: "Confirm Email",
        html: htmlCode(`${protocol}://${host}/user/${action}/${token}`),
      });
  
      console.log("Message sent: %s", info.messageId);
      return true; 
    } catch (error) {
      console.error("Email sending error:", error);
      return false; 
    }
  };
  