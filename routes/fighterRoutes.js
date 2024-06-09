import { Router } from 'express';
import { fighterService } from '../services/fighterService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import {
  createFighterValid,
  updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';

const router = Router();

// TODO: Implement route controllers for fighter
router.post(
  '/',
  createFighterValid,
  async (req, res, next) => {
    const reqBody = req.body;
    const user = await fighterService.create(reqBody);

    res.data = user;

    next();
  },
  responseMiddleware
);

router.get(
  '/',
  async (req, res, next) => {
    const fighters = await fighterService.getAllFighters();

    res.data = fighters;

    next();
  },
  responseMiddleware
);

export { router };
