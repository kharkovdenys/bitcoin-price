import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import rateRoutes from "./routes/rate.js";

const app = express();
const PORT = 3000;

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use("/api", rateRoutes);

app.listen(PORT, () => {
    console.log(`Started server on http://localhost:${PORT}/api`);
});