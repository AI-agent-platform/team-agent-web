export const validateName = (value: string): { valid: boolean; error?: string } => {
  if (!value.trim()) return { valid: false, error: "Business name is required" };
  if (value.trim().length < 2) return { valid: false, error: "Name must be at least 2 characters" };
  return { valid: true };
};

export const validateEmail = (value: string): { valid: boolean; error?: string } => {
  if (!value.trim()) return { valid: false, error: "Email is required" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return { valid: false, error: "Invalid email format" };
  return { valid: true };
};

export const validateContact = (value: string): { valid: boolean; error?: string } => {
  if (!value.trim()) return { valid: false, error: "Contact number is required" };
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length !== 10) return { valid: false, error: "Contact number must be 10 digits" };
  return { valid: true };
};

export const validateField = (value: string): { valid: boolean; error?: string } => {
  if (!value) return { valid: false, error: "Industry field is required" };
  return { valid: true };
};
