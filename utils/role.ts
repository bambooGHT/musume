import { readdir, access, writeFile } from 'fs/promises';
import { join } from 'path';

//角色json
// const rolejson = async (path: string, paths: string, minurl: string, url: string) => {
//   const list = await readdir(path);
//   // 異步任務
//   const data = (name: string): Promise<any> =>
//     new Promise(async (resolve, reject) => {
//       try {
//         const id = +name.slice(3);
//         const p = 'pose_' + id;
//         const i = 'icon_' + id;

//         let musume = `${p}_0/${p}_0.skel`;
//         await access(join(paths, musume)).catch(async () => {
//           await access(join(paths, musume.replace('skel', 'json')))
//             .then(() => musume = musume.replace('skel', 'json'))
//             .catch(() => (musume = ''));
//         });

//         let musume1 = `${p}_1/${p}_1.json`;
//         await access(join(paths, musume1)).catch(() => (musume1 = ''));

//         //圖片
//         // let pngurl = `${name}/${i}_0/${i}_0.png`;
//         // await access(join(path, pngurl)).catch(async () => {
//         //   await access(join(path, pngurl.replace('_0.png', '_0_s.png')))
//         //     .then(() => pngurl = pngurl.replace('_0.png', '_0_s.png'))
//         //     .catch(() => (pngurl = ''));
//         // });

//         //圖片 enemy
//         let pngurl = `${name}/${i}_0/${i}_0_s.png`;
//         await access(join(path, pngurl)).catch(async () => {
//           await access(join(path, pngurl.replace('_0_s.png', '_0.png')))
//             .then(() => pngurl = pngurl.replace('_0_s.png', '_0.png'))
//             .catch(() => (pngurl = ''));
//         });

//         let minmusume = `${name}/${name}_0/${name}.skel`;
//         await access(join(path, minmusume)).catch(async () => {
//           await access(join(path, minmusume.replace('skel', 'json')))
//             .then(() => minmusume = minmusume.replace('skel', 'json'))
//             .catch(() => (minmusume = ''));
//         });
//         resolve({
//           id,
//           name,
//           Weapons: 'Weapons',
//           role: musume && url + musume,
//           role_1: musume1 && url + musume1,
//           pngurl: pngurl && minurl + pngurl,
//           minrole: minmusume && minurl + minmusume
//         });
//       } catch (error) {
//         reject(error);
//       };
//     });

//   const res = await Promise.all(list.map((p) => data(p)));
//   const list1 = await readdir(paths);

//   //篩選json
//   const json = res.map(item => ({
//     id: item.id,
//     role: item.role,
//     role_1: item.role_1 ?? '',
//     minrole: item.minrole ?? '',
//   }));

//   // //去重
//   const arrs = list1.filter((p) => {
//     const id = +p.slice(5).replace(/(_0|_1)/, '');
//     return !res.find(item => item.id === id);
//   }).filter((p) => p.indexOf('_1') !== -1);

//   const role_1: any = [];
//   arrs.map(async (item) => {
//     const id = +item.slice(5).replace(/(_0|_1)/, '');
//     role_1.push({
//       id,
//       name: id,
//       pngurl: '',
//     });
//     let musume = `pose_${id}_0/pose_${id}_0.skel`;
//     let musume1 = `${item}/${item}.json`;
//     await access(join(paths, musume)).catch(async () => {
//       await access(join(paths, musume.replace('skel', 'json')))
//         .then(() => musume = musume.replace('skel', 'json'))
//         .catch(() => (musume = ''));
//     });
//     await access(join(paths, musume1)).catch(() => (musume1 = ''));
//     json.push({
//       id,
//       role: musume && url + musume,
//       role_1: musume1 && url + musume1,
//       minrole: ''
//     });
//   });

//   for (const key in res) {
//     delete res[key].role;
//     delete res[key].role_1;
//     delete res[key].minrole;
//   }

// await writeFile('./data/json/musume/musume.json', JSON.stringify(res));
// await writeFile('./data/json/musume/musumejson.json', JSON.stringify(json));
// await writeFile('./data/json/musume/musumede.json', JSON.stringify(role_1));

// await writeFile('./data/json/BeastGod/BeastGod.json', JSON.stringify(res));
// await writeFile('./data/json/BeastGod/BeastGodjson.json', JSON.stringify(json));
// await writeFile('./data/json/BeastGod/BeastGodde.json', JSON.stringify(role_1));

// await writeFile('./data/json/enemy/enemy.json', JSON.stringify(res));
// await writeFile('./data/json/enemy/enemyjson.json', JSON.stringify(json));
// await writeFile('./data/json/enemy/enemyde.json', JSON.stringify(role_1));
// };

// rolejson('./data/minmusume', './data/musume',
// 'http://43.138.26.158:3002/minmusume/','http://43.138.26.158:3002/musume/');

// rolejson('./data/minBeastGod', './data/BeastGod',
//   'http://43.138.26.158:3002/minBeastGod/', 'http://43.138.26.158:3002/BeastGod/');

// rolejson('./data/minenemy', './data/enemy',
//   'http://43.138.26.158:3002/minenemy/', 'http://43.138.26.158:3002/enemy/');


const rolelist = async (path: string) => {

  const list = await readdir(path);
  const roleinfo: Array<any> = [];
  const rolejson = new Map();

  // const newpath = `http://localhost:3002/`;
  const newpath = `http://43.138.26.158:3002/`;
  const rolepath = 'data/role';

  const role = async (name: string) => {

    const id = +name.slice(3);
    let minrole = `${name}/${name}_0/${name}.skel`;
    await access(`${path}/${minrole}`).catch(async () => {
      await access(`${path}/${minrole.replace('.skel', '.json')}`)
        .then(() => minrole = minrole.replace('.skel', '.json'))
        .catch(() => minrole = '');
    });

    const rolepath = 'data/role';
    const pose = `pose_${id}_0`;
    let role = `${pose}/${pose}.skel`;
    await access(`${rolepath}/${role}`).catch(async () => {
      await access(`${rolepath}/${role.replace('.skel', '.json')}`)
        .then(() => role = role.replace('.skel', '.json'))
        .catch(() => role = '');
    });

    const pose1 = `pose_${id}_1`;
    let role_1 = `${pose1}/${pose1}.json`;
    await access(`${rolepath}/${role_1}`).catch(() => role_1 = '');

    const icon = `icon_${id}`;
    const [oldname, newname] = +name[3] === 4 || +name[3] === 5 ? ['_0_s.png', '_0.png'] : ['_0.png', '_0_s.png',];
    let pngurl = `${name}/${icon}_0/${icon}${oldname}`;
    await access(`${path}/${pngurl}`).catch(async () => {
      await access(`${path}/${pngurl.replace(oldname, newname)}`)
        .then(() => pngurl = pngurl.replace(oldname, newname))
        .catch(() => pngurl = '');
    });
    roleinfo.push({
      id,
      name,
      Weapons: 'Weapons',
      pngurl: pngurl && `${newpath}${path}/${pngurl}`
    });
    let roles = +name[3] === 3 ? 'roles' : 'minrole';
    rolejson.set(id + '', {
      id,
      role: role && `${newpath}${rolepath}/${role}`,
      role_1: role_1 && `${newpath}${rolepath}/${role_1}`,
      [roles]: minrole && `${newpath}${path}/${minrole}`
    });
  };
  await Promise.all(list.map((p: string) => role(p)));

  const list1 = await readdir('data/role');
  const key = [...rolejson.keys()];
  const newlist = list1.filter((p: string) => {
    const id = +p.slice(5).replace(/(_1|_0)/, '');
    return !key.includes(id + '');
  }).filter((p) => p.includes('_1'));
  const roledeinfo: Array<any> = [];
  const role1 = async (name1: string) => {
    const id = +name1.slice(5).replace(/_1/, '');
    const pose = `pose_${id}_0`;
    let role = `${pose}/${pose}.skel`;
    await access(`${rolepath}/${role}`).catch(async () => {
      await access(`${rolepath}/${role.replace('.skel', '.json')}`)
        .then(() => role = role.replace('.skel', '.json'))
        .catch(() => role = '');
    });

    const pose1 = `pose_${id}_1`;
    let role_1 = `${pose1}/${pose1}.json`;
    await access(`${rolepath}/${role}`).catch(() => role_1 = '');
    roledeinfo.push({
      id,
      name: name1,
      Weapons: 'Weapons',
      pngurl: ''
    });
    rolejson.set(id + '', {
      id,
      role: role && `${newpath}${rolepath}/${role}`,
      role_1: role_1 && `${newpath}${rolepath}/${role_1}`,
    });
  };
  await Promise.all(newlist.map((p: string) => role1(p)));

  await writeFile('roleinfo.json', JSON.stringify(roleinfo.sort((p, s) => p.id - s.id)));
  await writeFile('rolejson.json', JSON.stringify([...rolejson.entries()]));
  await writeFile('rolede.json', JSON.stringify(roledeinfo));

};
rolelist('data/minrole');