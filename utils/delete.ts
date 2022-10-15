import { readdir, stat, unlink, rmdir } from 'fs/promises';

// const delele = (path: string) => {
//   fs.readdir(path, (err, file) => {
//     if (err) return;
//     file.forEach(filename => {
//       const filepath = `${path}/${filename}`;
//       fs.stat(filepath, (err, stat) => {
//         if (err) return;
//         if (stat.isFile()) {
//           ///#/.test(filename) || /dat/.test(filename) || /_s.png$/.test(filename)
//           if (/#/.test(filename) || /dat/.test(filename)) {
//             fs.unlink(filepath, (err) => {
//               if (err) throw err;
//               console.log('成功删除：' + filepath);
//             });
//           }
//         } else {
//           delele(filepath);
//         }
//       });
//     });
//   });
// };


//删除文件
const delele = async (path: string) => {
  const list = await readdir(path);
  await Promise.all(list.map(async (p: string) => {
    const file = `${path}/${p}`;
    const files = await stat(file);
    if (file.includes('general') || file.includes('main')) return Promise.reject(path);
    files.isDirectory() ? await delele(file) : await unlink(file);
  })).then(async () => await rmdir(path)).catch((err) => {
    console.log('包含 general 或 main 目录', err);
  });
  // .finally(async () => await rmdir(path));
};
// delele('data/voice');

const delele1 = async (path: string) => {
  const list = await readdir(path);
  await Promise.all(list.map(async (item: string) => {
    const stats = await stat(`${path}/${item}`);
    if (stats.isDirectory()) delele1(`${path}/${item}`);
    else {
      //  /#/  /dat/  /_s/
      /#/.test(item) && await unlink(`${path}/${item}`);
      /dat/.test(item) && await unlink(`${path}/${item}`);
    }
  }));
};
// delele1('data/minrole')