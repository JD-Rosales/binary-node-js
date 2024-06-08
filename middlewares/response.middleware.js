import { sendJSONResponse } from '../helpers/errorResponseHelper.js';

const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.result) {
    return res.status(200).json(res.result);
  }

  return sendJSONResponse(res, {
    message: 'requested data not found.',
    code: 404,
  });
};

export { responseMiddleware };
