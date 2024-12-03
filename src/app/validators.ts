import { ValidatorFn } from '@angular/forms';

const trimmedMinLength =
  (minLength: number): ValidatorFn =>
  (control) => {
    if (typeof control.value !== 'string') {
      return null;
    }

    if (control.value.trim().length < minLength) {
      return {
        minLength: {
          requiredLength: minLength,
          actualLength: control.value.trim().length,
        },
      };
    }

    return null;
  };

const nonEmpty: ValidatorFn = (control) => {
  if (typeof control.value !== 'string') {
    return null;
  }

  if (control.value.trim().length === 0) {
    return {
      nonEmpty: true,
    };
  }

  return null;
};

export const CustomValidators = {
  nonEmpty,
  trimmedMinLength,
};
