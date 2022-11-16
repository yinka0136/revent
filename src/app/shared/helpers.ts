import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

// export class CustomValidator {
//   static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } => {
//       if (!control.value) {
//         return null;
//       }

//       const valid = regex.test(control.value);

//       return valid ? null : error;
//     };
//   }

//   public static passwordMatchValidator(control: AbstractControl): void {
//     const password: string = control.get("password").value;
//     const confirmPassword: string = control.get("confirmPassword").value;
//     if (password !== confirmPassword) {
//       control.get("confirmPassword").setErrors({ NoPasswordMatch: true });
//     }
//   }
// }

export class CustomValidator {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): any => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  public static passwordMatchValidator(control: AbstractControl): void {
    const password: string = control.get('password')!.value;
    const confirmPassword: string = control.get('confirmPassword')!.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')!.setErrors({ NoPasswordMatch: true });
    }
  }
}
export const selectFields = (
  params: object,
  keys: string[],
  values: object| any
) => {
  return keys.reduce((acc, cur) => {
    return selectedFilter(acc, cur, values[cur]);
  }, params);
};

export const selectedFilter = (
  params: object| any,
  key: string,
  value?: string
): object => {
  params = { ...params, [key]: value };
  if (!value || !value.toString().trim().length) {
    delete params[key];
  }

  return params;
};