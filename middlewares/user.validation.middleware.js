import { USER } from '../models/user.js';
import {
  fieldValidator,
  hasExtraFields,
  hasIdField,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
} from '../helpers/validationHelper.js';
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
  const reqBody = req.body || {};

  if (hasIdField(reqBody)) {
    return sendJSONResponse(res, {
      message: 'Request body contains id field',
      code: 400,
    });
  }

  if (hasExtraFields(USER, reqBody)) {
    return sendJSONResponse(res, {
      message: `Request body contains extra field.`,
      code: 400,
    });
  }

  const userFields = Object.keys(USER);
  const reqFields = Object.keys(reqBody);

  // Check if at least one field from USER object is present in reqBody
  const hasValidField = userFields.some((field) => reqFields.includes(field));
  if (!hasValidField) {
    return sendJSONResponse(res, {
      message: 'Request body is empty.',
      code: 400,
    });
  }

  // if email exist in reqBody check if email is already in use
  if (reqBody.email) {
    // validation for valid email
    if (!isValidEmail(reqBody.email)) {
      return sendJSONResponse(res, {
        message: 'email is not a valid email address.',
        code: 400,
      });
    }

    const emailExist = userService.search({ email: reqBody.email });
    if (emailExist)
      return sendJSONResponse(res, {
        message: 'Email is already in use.',
        code: 400,
      });
  }

  // if phone number exist in reqBody check if phone number is already in use
  if (reqBody.phoneNumber) {
    //validation for valid phone number
    if (!isValidPhoneNumber(reqBody.phoneNumber)) {
      return sendJSONResponse(res, {
        message: 'phoneNumber is not a valid phone number.',
        code: 400,
      });
    }

    const phoneNumberExist = userService.search({
      phoneNumber: reqBody.phoneNumber,
    });
    if (phoneNumberExist)
      return sendJSONResponse(res, {
        message: 'Phone number is already in use.',
        code: 400,
      });
  }

  if (reqBody.password) {
    if (!isValidPassword(3, reqBody.password)) {
      return sendJSONResponse(res, {
        message: `password must be at least 3 characters.`,
        code: 400,
      });
    }
  }

  next();
};

export { createUserValid, updateUserValid };
