import { ChangeEvent, useState } from "react";

export const useModalState = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const changeState = () => setState(!state);
  return [state, changeState];
};

export const useTextInputState = (
  initialState: string
): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [state, setState] = useState<string>(initialState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState(e.target.value);
  return [state, onChange];
};

export const unixDateToString = (date: Date | string) => {
  let dateObj = new Date(date);
  let day = ("0" + dateObj.getDate()).slice(-2);
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let year = dateObj.getFullYear();
  let hours = ("0" + dateObj.getHours()).slice(-2);
  let minutes = ("0" + dateObj.getMinutes()).slice(-2);

  let formattedDate =
    day + "." + month + "." + year + " " + hours + ":" + minutes;
  return formattedDate;
};
