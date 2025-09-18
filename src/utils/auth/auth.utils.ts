import { LocalLoginReturn } from "../../api/dto/auth.dto";

export const storeAuthData = (data: LocalLoginReturn) => {
  localStorage.setItem("token", data.access_token);

  const existingPayloads = JSON.parse(
    localStorage.getItem("authPayloads") || "[]"
  );
  if (Array.isArray(existingPayloads)) {
    existingPayloads.push(data);
    localStorage.setItem("authPayloads", JSON.stringify(existingPayloads));
  } else {
    localStorage.setItem("authPayloads", JSON.stringify([data]));
  }
};

export const storeIsNewUser = (isNewUser: boolean) => {
  localStorage.setItem("isNewUser", isNewUser.toString());
};

export const getIsNewUser = (): boolean => {
  return localStorage.getItem("isNewUser") === "true";
};

export const validatePassword = (password: string): string | null => {
  const minLength = 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length < minLength ||
    (!hasUppercase && !hasLowercase && !hasNumber && !hasSpecialChar)
  ) {
    return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  return null;
};
