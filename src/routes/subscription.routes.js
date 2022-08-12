import { Router } from 'express';

import { addEmail, sendEmails } from '../controllers/subscription.controllers.js';

const router = Router();

router.post('/subscribe', addEmail);
router.post('/sendEmails', sendEmails);

export default router;