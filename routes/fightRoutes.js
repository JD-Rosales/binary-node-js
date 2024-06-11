import { Router } from 'express';
import { fightsService } from '../services/fightService.js';
import { createFightValid } from '../middlewares/fight.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.post(
  '/',
  createFightValid,
  async (req, res, next) => {
    const reqBody = req.body;
    const fight = await fightsService.create(reqBody);

    res.data = fight;

    next();
  },
  responseMiddleware
);

router.get(
  '/',
  async (req, res, next) => {
    const fights = await fightsService.getAllFights();

    res.data = fights;

    next();
  },
  responseMiddleware
);

export { router };
