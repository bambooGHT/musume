import { readdir } from 'fs/promises';
import { read, RESIZE_BICUBIC } from 'jimp';


//尺寸修改
const resize = async (path: string) => {

  const arr = await readdir(path);

  const data = (paths: string) => {
    return new Promise(async (res) => {
      const filepng = `${path}/${paths}`;
      let arr1 = await readdir(filepng);
      arr1 = arr1.filter(p => p.includes('png'));
      arr1.map(async (p) => {
        const png = await read(`${filepng}/${p}`);
        png.bitmap.width === 1024 ? png.resize(2048, 2048, RESIZE_BICUBIC).write(`${filepng}/${p}`) :
          console.log('尺寸大於1024');
      });
    });
  };
  await Promise.all(arr.map((p) => data(p)));
  // await data(arr[4]);
};
resize('data/role');