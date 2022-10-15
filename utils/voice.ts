import { access, readdir, writeFile } from "fs/promises";

const voicename = [
  '自己紹介',
  'マイページ1',
  'マイページ2',
  'マイページ3',
  'マイページ4(LV20以上)',
  'マイページ5(LV40以上)',
  'マイページ5(LV60以上)',
  'マイページ7(放置)',
  '戦闘開始',
  '配置1(掴み)',
  '配置2',
  '行動選択(移動)',
  '攻撃',
  'スキル発動',
  '状態異常',
  'やられ時',
  '勝利1(星3)',
  '勝利2(星2以下)',
  '敗北',
  'Lvアップ1(Lv30到達)',
  'Lvアップ2',
  'Lvアップ3',
  '潜在覚醒',
  'クラスチェンジ',
  '一言:喜び',
  '一言:怒り',
  '一言:哀しみ',
  '一言:楽しい',
  '一言:その他'
];
// const voice = async (path: string) => {
//   let list = await readdir(path);
//   list = list.filter(p => p.indexOf('ch') !== -1);
//   const url = 'http://43.138.26.158:3002/voice/';
//   const datalist = (ids: string): Promise<voicetype> => {
//     return new Promise(async (res, rej) => {
//       const data: any = await new Promise(async (res1) => {
//         const id = +ids.slice(3);
//         const file = await access(`${path}/${ids}/general/basic`).catch(() => { return false; });
//         if (file === false) {
//           res1({ id, voice: [] });
//           return;
//         }
//         const voices = await readdir(`${path}/${ids}/general/basic`);
//         const voice = voices.map((p: string, index: number) => {
//           const name = p.match(/\d{2}(?=\.wav)/)![0];
//           const UrlWav = `${url}${ids}/general/basic/${p}`;
//           return {
//             name: voicename[+name - 1],
//             UrlWav
//           };
//         });
//         res1({ id, voice });
//       });
//       const data1: any = await new Promise(async (res2) => {
//         const file1 = `${path}/${ids}/main`;
//         const voices1: any = await readdir(file1).catch(() => { return false; });
//         let main: any = {};
//         // if (voices1) await Promise.all(voices1.map(async (t: string) => {
//         //   const voice1 = await readdir(`${file1}/${t}`);
//         //   return main['main' + t] = voice1.map((p: string) => {
//         //     const UrlWav = `${url}${ids}/main/${t}/${p}`;
//         //     return {
//         //       name: p.replace('.wav', ''),
//         //       UrlWav
//         //     };
//         //   });
//         // }));
//         if (voices1) for (let i = 0; i < voices1.length; i++) {
//           const voice1 = await readdir(`${file1}/${voices1[i]}`);
//           main['main' + voices1[i]] = voice1.map((p: string) => {
//             const UrlWav = `${url}${ids}/main/${voices1[i]}/${p}`;
//             return {
//               name: p.replace('.wav', ''),
//               UrlWav
//             };
//           });
//         }
//         else main = undefined;
//         res2(main);
//       });
//       res({
//         ...data,
//         main: data1
//       });
//     });
//   };
//   // const voicelist = await datalist('ch_30005');
//   const voicelist = await Promise.all(list.map((p: string) => datalist(p)));
//   await writeFile('./data/json/voice.json', JSON.stringify(voicelist));
// };
// voice('./data/voice');

const voice = async (path: string) => {
  let list = await readdir(path);
  // const newpath = `http://localhost:3002/`;
  const newpath = `http://43.138.26.158:3002/`;
  const voicejson = new Map();
  const data = async (name: string) => {
    const id = +name.slice(3);
    const paths = `${path}/${name}/general/basic`;
    const file = await access(paths).then(() => true).catch(() => false);
    const voicedata: any = [];
    if (file) {
      const voicelist = await readdir(paths);
      voicelist.forEach((p: string) => {
        const name = p.match(/\d{2}(?=\.wav)/)![0];
        const UrlWav = `${newpath}${paths}/${p}`;
        voicedata.push({
          id,
          name: voicename[+name - 1],
          UrlWav
        });
      });
    }
    const voicemain: any = {};
    const main = `${path}/${name}/main`;
    const file1 = await readdir(main).catch(() => []);
    if (file1.length > 0) {
      for (let i = 0; i < file1.length; i++) {
        const maindata = await readdir(`${main}/${file1[i]}`);
        voicemain['main' + file1[i]] = maindata.map((p: string) => {
          const UrlWav = `${newpath}${main}/${file1[i]}/${p}`;
          return {
            name: p.replace('.wav', ''),
            UrlWav
          };
        });
      }
    }
    voicejson.set(id, {
      id,
      voice: voicedata,
      main: voicemain
    });
  };
  await Promise.all(list.map((p: string) => data(p)));
  await writeFile('voice.json', JSON.stringify([...voicejson.entries()]));
};
voice('data/voice');