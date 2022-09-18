import { color } from "./theme";

const changeStyle = () => {
  let theme = JSON.parse(String(localStorage.getItem('theme')));
  for (let key in theme) {
    document.body.style.setProperty(`--${key}`, theme[key]);
  }
};
export const themes = (num?: number) => {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', JSON.stringify(color[0]));
    localStorage.setItem('theme1', '1');
    changeStyle();
    return;
  }
  num !== undefined && localStorage.setItem('theme', JSON.stringify(color[num]));
  changeStyle();
};