import { Router } from 'express';

import { getRate } from '../controllers/rate.controllers.js';

const router = Router();

router.get('/rate', getRate);

export default router;