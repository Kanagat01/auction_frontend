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

export const dateToTimeString = (date: string | Date) => {
  return new Date(date)
    .toLocaleDateString("ru", {
      hour: "numeric",
      minute: "numeric",
    })
    .split(" ")[1];
};

export const dateToString = (date: string | Date) => {
  return new Date(date).toLocaleDateString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const dateToLongMonthString = (date: string | Date) => {
  return new Date(date).toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const dateTimeToString = (datetime: string | Date) => {
  return new Date(datetime).toLocaleDateString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export function formatPhoneNumber(phoneNumber: string) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phoneNumber;
}
