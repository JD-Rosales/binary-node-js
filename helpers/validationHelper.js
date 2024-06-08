function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phonePattern = /^\+380\d{9}$/;
  return phonePattern.test(phoneNumber);
}

function fieldValidator(ruleFields, valuesObject) {
  for (const ruleField in ruleFields) {
    const rule = ruleFields[ruleField];
    const value = valuesObject[ruleField];

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
