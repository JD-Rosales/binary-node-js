import { FIGHT } from '../models/fight.js';
import { fieldValidator } from '../helpers/validationHelper.js';
import { sendJSONResponse } from '../helpers/errorResponseHelper.js';

const createFightValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const reqBody = req.body;

  const rulesField = {
    fighter1: { required: true },
    fighter2: { required: true },
    log: { required: true },
  };

  const error = fieldValidator({ rulesField, modelObject: FIGHT, reqBody });

  if (error) return sendJSONResponse(res, { message: error, code: 400 });

  next();
};

export { createFightValid };
