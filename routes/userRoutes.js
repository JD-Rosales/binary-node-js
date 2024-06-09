import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

// TODO: Implement route controllers for user
router.post(
  '/',
  createUserValid,
  async (req, res, next) => {
    const reqBody = req.body;
    const user = await userService.create(reqBody);

    res.data = user;

    next();
  },
  responseMiddleware
);

router.get(
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.search({ id });

    res.data = user;

    next();
  },
  responseMiddleware
);

router.get(
  '/',
  async (req, res, next) => {
    const users = await userService.getAllUsers();

    res.data = users;

    next();
  },
  responseMiddleware
);

router.patch(
  '/:id',
  updateUserValid,
  async (req, res, next) => {
    const { id } = req.params;
    const reqBody = req.body;
    const user = await userService.updateUser(id, reqBody);

    res.data = user;

    next();
  },
  responseMiddleware
);

router.delete(
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.deleteUser(id);

    res.data = user;

    next();
  },
  responseMiddleware
);

export { router };
