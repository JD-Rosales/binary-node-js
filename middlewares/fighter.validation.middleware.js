import { FIGHTER } from '../models/fighter.js';
import { fieldValidator } from '../helpers/validationHelper.js';
import { sendJSONResponse } from '../helpers/errorResponseHelper.js';
import { fighterService } from '../services/fighterService.js';

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const reqBody = req.body;

  // Set default health if not provided
  req.body.health = req.body.health ? req.body.health : FIGHTER.health;
  reqBody.health = req.body.health ? req.body.health : FIGHTER.health;

  const rulesField = {
    name: { required: true },
    health: {
      optional: true,
      default: 85,
      type: 'number',
      minNumber: 80,
      maxNumber: 120,
    },
    power: { required: true, type: 'number', minNumber: 1, maxNumber: 100 },
    defense: { required: true, type: 'number', minNumber: 1, maxNumber: 10 },
  };

  const error = fieldValidator({ rulesField, modelObject: FIGHTER, reqBody });

  if (error) return sendJSONResponse(res, { message: error, code: 400 });

  const isNameValid = fighterService.search({ name: reqBody.name });

  if (isNameValid)
    return sendJSONResponse(res, {
      message: `fighter name ${reqBody.name} is not available.`,
      code: 400,
    });

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
