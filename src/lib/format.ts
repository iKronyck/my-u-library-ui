export interface ApiError {
  [field: string]: string[];
}

export interface FormattedError {
  [field: string]: string;
}

export const formatApiErrors = (errors: ApiError): FormattedError => {
  const formattedErrors: FormattedError = {};

  Object.keys(errors).forEach((field) => {
    const fieldErrors = errors[field];
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      formattedErrors[field] = fieldErrors[0].replace(
        "This field ",
        `Field ${field} `
      );
    }
  });

  return formattedErrors;
};

export const getFieldError = (
  errors: FormattedError,
  field: string
): string | undefined => {
  return errors[field];
};

export const hasFieldError = (
  errors: FormattedError,
  field: string
): boolean => {
  return !!errors[field];
};

export const getAllErrorMessages = (errors: FormattedError): string => {
  return Object.values(errors).join("\n");
};
