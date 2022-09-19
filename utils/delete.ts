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
  let list = await readdir(path);
  // list.map(async (p) => {
  //   const file = `${path}/${p}`;
  //   const files = await stat(file);
  //   if (files.isDirectory()) {
  //     if (file.indexOf('general') !== -1 || file.indexOf('main') !== -1) return;
  //     console.log(file);
  //     await delele(file);
  //   } else {
  //     await unlink(file);
  //   }
  //   await rmdir(file).catch(() => { });
  // });
  list.map(async (item: string) => {
    const stats = await stat(`${path}/${item}`);
    if (stats.isDirectory()) {
      delele(`${path}/${item}`);
    } else {
      //  /#/  /dat/  /_s/
      /#/.test(item) && await unlink(`${path}/${item}`);
      /dat/.test(item) && await unlink(`${path}/${item}`);
    }
  });
};
delele('./data/minmusume');