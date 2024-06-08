function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phonePattern = /^\+380\d{9}$/;
  return phonePattern.test(phoneNumber);
}

function hasExtraFields(modelObject, reqBody) {
  if (
    Object.keys(reqBody).some(
      (field) => !Object.keys(modelObject).includes(field)
    )
  ) {
    return true;
  }
}

function hasIdField(reqBody) {
  if ('id' in reqBody) {
    return true;
  }
}

function fieldValidator({ rulesField, modelObject, reqBody }) {
  if (hasIdField(reqBody)) {
    return `Request body has id field`;
  }

  if (hasExtraFields(modelObject, reqBody)) {
    return `Request body has extra field/s`;
  }

  for (const ruleField in rulesField) {
    const rule = rulesField[ruleField];
    const value = reqBody[ruleField];

    // validation for required field
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        return `${ruleField} is required.`;
      }
    }

    // validation for valid email
    if (rule.email) {
      if (!isValidEmail(value)) {
        return `${ruleField} is not a valid email address.`;
      }
    }

    //validation for valid phone number
    if (rule.phoneNumber) {
      if (!isValidPhoneNumber(value)) {
        return `${ruleField} is not a valid phone number.`;
      }
    }

    // validattion for valid value length
    if (rule.minLength) {
      if (value.length < rule.minLength) {
        return `${ruleField} must be at least ${rule.minLength} characters.`;
      }
    }
  }
}

export { fieldValidator };
