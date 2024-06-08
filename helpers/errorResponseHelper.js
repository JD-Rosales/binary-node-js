function sendJSONResponse(res, { message, code }) {
  return res.status(code).json({ error: true, message });
}

export { sendJSONResponse };
