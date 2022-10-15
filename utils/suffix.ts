import { readdir, stat, rename } from 'fs/promises';
//重命名
// const suffix = async (data: { path: string, original: original, Revise: Revise; }) => {
//   let list = await readdir(data.path);
//   list.map(async (item: string) => {
//     const file = `${data.path}/${item}`;
//     const stats = await stat(file);
//     if (stats.isDirectory()) {
//       suffix({ ...data, path: file });
//     } else {
//       await rename(file, file.replace(data.original, data.Revise));
//     }
//   });
// };
// suffix({ path: `D:/VUE3/chr_poses`, original: original.MUSUMESKEL, Revise: Revise.MUSUMESKEL });
// suffix({ path: `D:/VUE3/\chr_poses`, original: original.ATLAS, Revise: Revise.ATLAS });
// suffix({ path: `D:/VUE3/\chr_poses`, original: original.PREFAB, Revise: Revise.JSON });

const suffix = async (path: string) => {
  const list = await readdir(path);
  list.forEach(async (p: string) => {
    const newpath = `${path}/${p}`;
    const stats = await stat(newpath);
    if (stats.isDirectory()) await suffix(newpath);
    else {
      if (/skel\.prefab/.test(p)) await rename(newpath, newpath.replace('skel.prefab', 'skel'));
      else if (/atlas\.prefab/.test(p)) await rename(newpath, newpath.replace('atlas.prefab', 'atlas'));
      else if (/prefab/.test(p)) await rename(newpath, newpath.replace('prefab', 'json'));
    }
  });
};
// suffix('data/role');
suffix('data/minrole');