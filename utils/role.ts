// import { readdirSync, statSync } from "fs";
// export const traverse = (paths: string, arr: any, url: string) => {
//   //遍歷文件
//   const sync = readdirSync(paths);
//   sync.forEach(p => {
//     const file = statSync(`${paths}/${p}`);
//     //如果是文件夾
//     if (file.isDirectory()) {
//       traverse(`${paths}/${p}`, arr, url);
//     } else {
//       const listarr = paths.replace(/\S*(?=minmusume)/, url);
//       if (p.indexOf('icon') === -1) {
//         const match = p.match(/\d{5,6}.json/);
//         if (match) {
//           const name = p.replace('.json', '');
//           arr.push({
//             id: Number(match[0].replace('.json', '')),
//             name: name,
//             Weapons: 'Weapons',
//             pngurl: '',
//             musume: '',
//             minmusume: `${listarr}/${p}`,
//           });
//         }
//         return;
//       }
//       const png = p.replace('_0.png', '').replace('icon_', '');
//       const index = arr.findIndex((s: { id: number; }) => s.id === Number(png));
//       if (index !== -1) {
//         (arr[index].pngurl = `${listarr}/${p}`);
//       } else {
//         arr.push({
//           id: Number(png),
//           name: p.replace('_0.png', ''),
//           pngurl: `${listarr}/${p}`
//         });
//       }
//     }
//   });
// };

import { readdir, access, writeFile } from 'fs/promises';
import { join } from 'path';

//角色json
const rolejson = async (path: string, paths: string,minurl:string,url:string) => {
  const list = await readdir(path);
  // 異步任務
  const data = (name: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
      try {
        const id = +name.slice(3);
        const p = 'pose_' + id;
        const i = 'icon_' + id;

        let musume = `${p}_0/${p}_0.skel`;
        await access(join(paths, musume)).catch(async () => {
          await access(join(paths, musume.replace('skel', 'json')))
            .then(() => musume = musume.replace('skel', 'json'))
            .catch(() => (musume = ''));
        });

        let musume1 = `${p}_1/${p}_1.json`;
        await access(join(paths, musume1)).catch(() => (musume1 = ''));

        //圖片
        // let pngurl = `${name}/${i}_0/${i}_0.png`;
        // await access(join(path, pngurl)).catch(async () => {
        //   await access(join(path, pngurl.replace('_0.png', '_0_s.png')))
        //     .then(() => pngurl = pngurl.replace('_0.png', '_0_s.png'))
        //     .catch(() => (pngurl = ''));
        // });

        //圖片 enemy
        let pngurl = `${name}/${i}_0/${i}_0_s.png`;
        await access(join(path, pngurl)).catch(async () => {
          await access(join(path, pngurl.replace('_0_s.png', '_0.png')))
            .then(() => pngurl = pngurl.replace('_0_s.png', '_0.png'))
            .catch(() => (pngurl = ''));
        });

        let minmusume = `${name}/${name}_0/${name}.skel`;
        await access(join(path, minmusume)).catch(async () => {
          await access(join(path, minmusume.replace('skel', 'json')))
            .then(() => minmusume = minmusume.replace('skel', 'json'))
            .catch(() => (minmusume = ''));
        });
        resolve({
          id,
          name,
          Weapons: 'Weapons',
          role: musume && url + musume,
          role_1: musume1 && url + musume1,
          pngurl: pngurl && minurl + pngurl,
          minrole: minmusume && minurl + minmusume
        });
      } catch (error) {
        reject(error);
      };
    });
  // 異步并發
  const res = await Promise.all(list.map((p) => data(p)));
  const list1 = await readdir(paths);

  //篩選json
  const json = res.map(item => ({
    id: item.id,
    role: item.role,
    role_1: item.role_1 ?? '',
    minrole: item.minrole ?? '',
  }));

  // //去重
  const arrs = list1.filter((p) => {
    const id = +p.slice(5).replace(/(_0|_1)/, '');
    return !res.find(item => item.id === id);
  }).filter((p) => p.indexOf('_1') !== -1);

  const role_1: any = [];
  arrs.map(async (item) => {
    const id = +item.slice(5).replace(/(_0|_1)/, '');
    role_1.push({
      id,
      name: id,
      pngurl: '',
    });
    let musume = `pose_${id}_0/pose_${id}_0.skel`;
    let musume1 = `${item}/${item}.json`;
    await access(join(paths, musume)).catch(async () => {
      await access(join(paths, musume.replace('skel', 'json')))
        .then(() => musume = musume.replace('skel', 'json'))
        .catch(() => (musume = ''));
    });
    await access(join(paths, musume1)).catch(() => (musume1 = ''));
    json.push({
      id,
      role: musume && url + musume,
      role_1: musume1 && url + musume1,
      minrole: ''
    });
  });

  for (const key in res) {
    delete res[key].role;
    delete res[key].role_1;
    delete res[key].minrole;
  }

  // await writeFile('./data/json/musume/musume.json', JSON.stringify(res));
  // await writeFile('./data/json/musume/musumejson.json', JSON.stringify(json));
  // await writeFile('./data/json/musume/musumede.json', JSON.stringify(role_1));

  // await writeFile('./data/json/BeastGod/BeastGod.json', JSON.stringify(res));
  // await writeFile('./data/json/BeastGod/BeastGodjson.json', JSON.stringify(json));
  // await writeFile('./data/json/BeastGod/BeastGodde.json', JSON.stringify(role_1));

  await writeFile('./data/json/enemy/enemy.json', JSON.stringify(res));
  await writeFile('./data/json/enemy/enemyjson.json', JSON.stringify(json));
  await writeFile('./data/json/enemy/enemyde.json', JSON.stringify(role_1));
};

// rolejson('./data/minmusume', './data/musume',
// 'http://localhost:3002/minmusume/','http://localhost:3002/musume/');

// rolejson('./data/minBeastGod', './data/BeastGod',
// 'http://localhost:3002/minBeastGod/','http://localhost:3002/BeastGod/');

rolejson('./data/minenemy', './data/enemy',
'http://localhost:3002/minenemy/','http://localhost:3002/enemy/');