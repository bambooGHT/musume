// import fs from 'fs/promises';
// import { join } from 'path';
// // //移動文件
// const move = async (path: string, newpath: string) => {
//   const list = await fs.readdir(path);
  // const res = list.filter(p => p[3] == '3');
//   const res = list.filter(p => p[3] == '4' || p[3] == '5');
//   res.forEach(async (s) => {
//     await fs.rename(`${path}/${s}`, `${newpath}/${s}`);
//   });
// };
// move('./data/musume', './data/BeastGod');
// move('./data/minmusume', './data/minBeastGod');
// move('./data/musume', './data/enemy');
// move('./data/minmusume', './data/minenemy');


// const move = async () => {
//   const path = 'D:/VUE3/data/assets/advscene/resources/advscene/sound/voice';
//   await fs.cp(path, 'D:/VUE3/musume-api/data/voice', { recursive: true });
// };
// move();