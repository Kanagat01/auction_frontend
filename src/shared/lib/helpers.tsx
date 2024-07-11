export const validatePassword = (password: string): string => {
  if (password.length < 8) return "Пароль должен быть не менее 8 символов";
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return "Пароль должен состоять из больших и маленьких букв";
  }
  if (!/\d/.test(password) || !/[@$!%*?&]/.test(password))
    return "Пароль должен содержать хотя бы одну цифру и специальный знак";
  return "";
};

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
