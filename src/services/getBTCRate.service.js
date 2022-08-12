import axios from "axios";
import 'dotenv/config';

export const getBTCRate = async () => {
    const { data } = await axios.get(process.env.API);
    return data.bitcoin.uah.toString();
}