import { Router } from 'express';
import home from './homeRoute';

const router = Router();

router.use(home);

export default router;
