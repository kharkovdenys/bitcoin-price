import axios from "axios";
import 'dotenv/config'

export const getPrice = async () => {
    const { data } = await axios.get(process.env.API);
    return data.bitcoin;
}