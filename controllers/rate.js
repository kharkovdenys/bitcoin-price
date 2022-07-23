import { getPrice } from "../helpers/third-party-service.js"

export const getRate = async (req, res) => {
    try {
        const data = await getPrice();
        res.send(data);
    }
    catch {
        res.status(400).send();
    }
}