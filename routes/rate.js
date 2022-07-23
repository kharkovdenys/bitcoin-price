import express from 'express';

import { getRate } from '../controllers/rate.js';

const router = express.Router();

router.get('/rate', getRate);

export default router;