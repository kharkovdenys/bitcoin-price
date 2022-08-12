import { getBTCRate } from "../services/getBTCRate.service.js";

export const getRate = async (_req, res) => {
    try {
        res.send({ uah: await getBTCRate() });
    } catch {
        res.status(400).send({ "error": "Error receiving data" });
    }
};