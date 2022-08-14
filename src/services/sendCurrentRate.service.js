import { createTransport } from "nodemailer";
import 'dotenv/config';

import { getBTCRate } from "./getBTCRate.service.js";


const transporter = createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendCurrentRate = async (emails) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: emails,
        subject: "The current rate",
        text: "UAH: " + await getBTCRate()
    };
    await transporter.sendMail(mailOptions);
};