import db from "../services/db.service.js";

import { sendCurrentRate } from "../services/sendCurrentRate.service.js";
import { validateEmail } from "../utils/validateEmail.util.js";

export const addEmail = async (req, res) => {
    const email = req.body.email.trim();
    if (!validateEmail(email)) {
        res.status(400).send({ "error": "This is not an email" });
        return;
    }
    try {
        if (db.contains(email)) {
            res.status(409).send({ "error": "This email already exists" });
            return;
        }
        await db.add(email);
        res.send({});
    } catch {
        res.status(400).send({ "error": "Email is not added to the list" });
    }
};

export const sendEmails = async (_req, res) => {
    try {
        if (db.isEmpty()) {
            res.status(400).send({ "error": "Emails list is empty" });
            return;
        }
        await sendCurrentRate(db.getAll());
        res.send({});
    } catch {
        res.status(400).send({ "error": "Emails fail to send" });
    }
};