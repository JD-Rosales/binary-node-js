import { USER } from '../models/user.js';
import { fieldValidator } from '../helpers/validationHelper.js';
import { sendJSONResponse } from '../helpers/errorResponseHelper.js';
import { userService } from '../services/userService.js';

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const reqBody = req.body;

  const rulesField = {
    firstName: { required: true },
    lastName: { required: true },
    email: { required: true, email: true },
    phoneNumber: { required: true, phoneNumber: true },
    password: { required: true, minLength: 3 },
  };

  const error = fieldValidator({ rulesField, modelObject: USER, reqBody });

  if (error) return sendJSONResponse(res, { message: error, code: 400 });

  // check if email is already in use
  const emailExist = userService.search({ email: reqBody.email });
  if (emailExist)
    return sendJSONResponse(res, {
      message: 'Email is already in use.',
      code: 400,
    });

  // check if phone number is already in use
  const phoneNumberExist = userService.search({
    phoneNumber: reqBody.phoneNumber,
  });
  if (phoneNumberExist)
    return sendJSONResponse(res, {
      message: 'Phone number is already in use.',
      code: 400,
    });

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
