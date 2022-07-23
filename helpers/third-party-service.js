import axios from "axios";

export const getPrice = async () => {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah");
    return data.bitcoin;
}