import express from 'express';
const router = express.Router();

import { peopleController } from '../controller/user.js';

router.post('/missing', peopleController);

export default router;