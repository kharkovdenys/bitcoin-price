import fs from "fs/promises";
import { createTransport } from "nodemailer";
import 'dotenv/config'

import { getPrice } from "../helpers/third-party-service.js"

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const addEmail = async (req, res) => {
    const email = req.body.email;
    if (!validateEmail(email)) {
        res.status(400).send({ "error": "This is not an email" });
        return;
    }
    try {
        const data = await fs.readFile("./emails.txt", 'utf8');
        if (data.split("\n").includes(email)) {
            res.status(409).send({ "error": "This email already exists" });
            return;
        }
        await fs.appendFile("./emails.txt", email + '\n');
        res.send({});
    }
    catch {
        res.status(400).send({ "error": "Email is not added to the list" });
    }
}

export const sendEmails = async (_req, res) => {
    try {
        const data = await fs.readFile("./emails.txt", 'utf8');
        const emails = data.split("\n");
        emails.pop();
        if (!emails.length) {
            res.status(400).send({ "error": "Emails list is empty" });
            return;
        }
        var transporter = createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: emails,
            subject: "The current rate",
            text: "UAH: " + (await getPrice()).uah.toString()
        }
        await transporter.sendMail(mailOptions);
        res.send({});
    }
    catch {
        res.status(400).send({ "error": "Emails fail to send" });
    }
}