import fs from "fs";
import nodemailer from "nodemailer";

import { getPrice } from "../helpers/third-party-service.js"

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const addEmail = async (req, res) => {
    const email = req.body.email;
    if (!validateEmail(email)) {
        res.status(400).send("This is not an email");
        return;
    }
    fs.readFile("./emails.txt", 'utf8', function (err, data) {
        if (err) {
            res.status(400).send();
            return;
        }
        if (data.split("\n").includes(email)) {
            res.status(409).send();
            return;
        }
        fs.appendFile("./emails.txt", email + '\n', function (err) {
            if (err) {
                res.status(400).send();
                return;
            }
            res.send();
        })
    });
}

export const sendEmails = async (req, res) => {
    fs.readFile("./emails.txt", 'utf8', async function (err, data) {
        if (err) {
            res.status(400).send();
            return;
        }
        const emails = data.split("\n");
        emails.pop();
        if (!emails.length) {
            res.status(400).send("Emails list is empty");
            return;
        }
        var transporter = nodemailer.createTransport({
            service: "Outlook365",
            auth: {
                user: 'bitcoin.price@outlook.com',
                pass: 'pm?rBi?aUXB*b6z'
            }
        });
        const mailOptions = {
            from: 'bitcoin.price@outlook.com',
            to: emails,
            subject: "The current rate",
            text: "UAH: " + (await getPrice()).uah.toString()
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.send();
        })
    });
}