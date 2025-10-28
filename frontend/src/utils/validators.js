/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Required field validation
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Min length validation
 */
export const minLength = (value, min) => {
  if (typeof value === 'string') {
    return value.length >= min;
  }
  return false;
};

/**
 * Max length validation
 */
export const maxLength = (value, max) => {
  if (typeof value === 'string') {
    return value.length <= max;
  }
  return false;
};

/**
 * Number range validation
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Form validator
 */
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !isRequired(value)) {
      errors[field] = fieldRules.requiredMessage || `${field} gerekli`;
      return;
    }

    if (fieldRules.email && value && !isValidEmail(value)) {
      errors[field] = fieldRules.emailMessage || 'Geçersiz email adresi';
      return;
    }

    if (fieldRules.minLength && value && !minLength(value, fieldRules.minLength)) {
      errors[field] = fieldRules.minLengthMessage || `En az ${fieldRules.minLength} karakter olmalı`;
      return;
    }

    if (fieldRules.maxLength && value && !maxLength(value, fieldRules.maxLength)) {
      errors[field] = fieldRules.maxLengthMessage || `En fazla ${fieldRules.maxLength} karakter olmalı`;
      return;
    }

    if (fieldRules.min !== undefined && fieldRules.max !== undefined && value) {
      if (!isInRange(value, fieldRules.min, fieldRules.max)) {
        errors[field] = fieldRules.rangeMessage || `${fieldRules.min} ile ${fieldRules.max} arasında olmalı`;
        return;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  isValidEmail,
  isRequired,
  minLength,
  maxLength,
  isInRange,
  validateForm
};
