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

function isValidPassword(minLength, password) {
  if (password.length < minLength) {
    return false;
  }

  return true;
}

function isNumber(value) {
  if (typeof value === 'number') {
    return true;
  }
}

function fieldValidator({ rulesField, modelObject, reqBody }) {
  if (hasIdField(reqBody)) {
    return `Request body contains id field.`;
  }

  if (hasExtraFields(modelObject, reqBody)) {
    return `Request body contains extra field.`;
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

    // skip validation if field is optional and has a falsy value
    if (rule.optional && !value) continue;

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
      if (!isValidPassword(rule.minLength, value))
        return `${ruleField} must be at least ${rule.minLength} characters.`;
    }

    // validation for valid number
    if (rule.type === 'number') {
      if (!isNumber(value)) {
        return `${ruleField} is not a valid number.`;
      }
    }

    if (rule.minNumber) {
      if (value < rule.minNumber) {
        return `${ruleField} must be greater than ${rule.minNumber}.`;
      }
    }

    if (rule.maxNumber) {
      if (value > rule.maxNumber) {
        return `${ruleField} must be less than ${rule.maxNumber}.`;
      }
    }
  }
}

export {
  fieldValidator,
  hasExtraFields,
  hasIdField,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
};
