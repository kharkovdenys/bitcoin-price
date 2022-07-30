import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config'

import rateRoutes from "./routes/rate.js";
import subscriptionRoutes from "./routes/subscription.js";

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", rateRoutes);
app.use("/api", subscriptionRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Started server on http://${process.env.HOST}:${process.env.PORT}/api`);
});