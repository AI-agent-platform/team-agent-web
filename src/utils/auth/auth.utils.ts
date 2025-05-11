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
