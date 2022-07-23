import express from 'express';

import { addEmail, sendEmails } from '../controllers/subscription.js';

const router = express.Router();

router.post('/subscribe', addEmail);
router.post('/sendEmails', sendEmails);

export default router;