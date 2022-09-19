import type { Request, Response } from "express";
import { readFile } from "fs/promises";
// import { resolve } from "path";

type re<T, U> = {
  [key: string]: (req: T, res: U) => void;
};

const role: re<Request, Response> = {
  async rolelist(req, res) {
    const data = await readFile(`./data/json/${req.params.id}/${req.params.id}.json`, 'utf-8');
    const data1 = await readFile(`./data/json/${req.params.id}/${req.params.id}de.json`, 'utf-8');
    res.status(200).send({
      code: 200,
      data: {
        role: JSON.parse(data),
        roles: JSON.parse(data1),
      },
      message: '獲取成功'
    });
  },
  async rolespine(req, res) {
    const { id } = req.query;
    let data: any;
    const id1 = String(id)[0];
    if (id1 === '3') {
      data = JSON.parse(await readFile('./data/json/BeastGod/BeastGodjson.json', 'utf-8'));
    } else if (id1 === '4' || id1 === '5') {
      data = JSON.parse(await readFile('./data/json/enemy/enemyjson.json', 'utf-8'));
    } else data = JSON.parse(await readFile('./data/json/musume/musumejson.json', 'utf-8'));
    const dataindex = data.find((item: { id: Number; }) => '' + item.id === id);
    if (!dataindex) {
      return res.status(360).send({
        code: 360,
        message: '參數錯誤'
      });
    }
    res.status(200).send({
      code: 200,
      data: dataindex,
      message: '獲取成功_' + id
    });
  },
  async vioce(req, res) {
    const data = JSON.parse(await readFile('./data/json/voice.json', 'utf-8'));
    const dataindex = data.find((item: { id: Number; }) => '' + item.id === req.params.id.replace('ch_', ''));
    res.status(200);
    if (!dataindex) {
      return res.send({
        code: 200,
        data: {
          id: req.params.id.replace('ch_', ''),
          voice: []
        },
        message: '無'
      });
    }
    res.send({
      code: 200,
      data: dataindex,
      message: '獲取成功_' + dataindex.id
    });
  }
  // async musumejson(req, res) {
  //   console.log(req.path);
  //   const path = resolve(`./data${req.path}`);
  //   req.path.indexOf('png') !== -1 &&
  //   res.sendFile(path);
  // }
};
export default role;