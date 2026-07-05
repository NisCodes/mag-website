import express from 'express';
import { getNewsletter } from '../controllers/newsletterController.js';

const router = express.Router();
router.get('/get', getNewsletter);

export { router as newsletterRouter };
