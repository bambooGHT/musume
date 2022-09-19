// import fs from 'fs';
export enum original {
  'MUSUMESKEL' = 'skel.prefab',
  'ATLAS' = 'atlas.prefab',
  'PREFAB' = 'prefab'
}
export enum Revise {
  'MUSUMESKEL' = 'skel',
  'ATLAS' = 'atlas',
  'JSON' = 'json'
}

// const suffix = (data: { path: string, original: original, Revise: Revise; }) => {
//   fs.readdir(data.path, (err, file) => {
//     if (err) return;
//     file.forEach(filename => {
//       const fliepath = `${data.path}/${filename}`;
//       fs.stat(fliepath, (error, stat) => {
//         if (error) return;
//         //是文件
//         stat.isFile() &&
//           fs.rename(fliepath, fliepath.replace(data.original, data.Revise), err => { });
//         //是文件夾
//         stat.isDirectory() &&
//           suffix({ path: fliepath, original: data.original, Revise: data.Revise });
//       });
//     });
//   }
//   );
// };


import { readdir, stat, rename } from 'fs/promises';
/**
 * @param data suffix
 */
//重命名
const suffix = async (data: { path: string, original: original, Revise: Revise; }) => {
  let list = await readdir(data.path);
  list.map(async (item: string) => {
    const file = `${data.path}/${item}`;
    const stats = await stat(file);
    if (stats.isDirectory()) {
      suffix({ ...data, path: file });
    } else {
      await rename(file, file.replace(data.original, data.Revise));
    }
  });
};
// suffix({ path: `./data/minmusume`, original: original.MUSUMESKEL, Revise: Revise.MUSUMESKEL });
// suffix({ path: `./data/minmusume`, original: original.ATLAS, Revise: Revise.ATLAS });
// suffix({ path: `./data/minmusume`, original: original.PREFAB, Revise: Revise.JSON });