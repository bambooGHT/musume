//时间戳節流
let t = 0;
const throttle = (fn: Function, m: number) => {
  const time = new Date().getTime();
  if (time - t > m) {
    fn();
    t = time;
  }
};
//定时器防抖
let time: any = 0;
const debounce = (fn: Function) => {
  time && clearTimeout(time);
  time = setTimeout(() => {
    fn();
  }, 16);
};

let time1: any = 0;
const debounce1 = (fn: Function, times: number) => {
  time1 && clearTimeout(time1);
  time1 = setTimeout(() => {
    fn();
  }, times);
};
export {
  throttle,
  debounce,
  debounce1,
};

