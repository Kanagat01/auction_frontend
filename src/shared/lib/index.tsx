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
