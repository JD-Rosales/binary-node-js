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
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const fighter = await fighterService.search({ id });

    res.data = fighter;

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

router.patch(
  '/:id',
  updateFighterValid,
  async (req, res, next) => {
    const { id } = req.params;
    const reqBody = req.body;
    const fighter = await fighterService.updateFighter(id, reqBody);

    res.data = fighter;

    next();
  },
  responseMiddleware
);

router.delete(
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const fighter = await fighterService.deleteFighter(id);

    res.data = fighter;

    next();
  },
  responseMiddleware
);

export { router };
