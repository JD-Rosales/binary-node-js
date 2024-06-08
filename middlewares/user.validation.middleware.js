import { USER } from '../models/user.js';
import { fieldValidator } from '../helpers/validationHelper.js';
import { sendJSONResponse } from '../helpers/errorResponseHelper.js';

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const ruleFields = {
    firstName: { required: true },
    lastName: { required: true },
    email: { required: true, email: true },
    phoneNumber: { required: true, phoneNumber: true },
    password: { required: true, minLength: 3 },
  };

  const error = fieldValidator(ruleFields, {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });

  if (error) return sendJSONResponse(res, { message: error, code: 400 });

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
