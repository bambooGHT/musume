import type { Request, Response } from "express";
import { readFile } from "fs/promises";
// import { resolve } from "path";

type re<T, U> = {
  [key: string]: (req: T, res: U) => void;
};
let roleinfo: any;
let roleinfo1: any;
let rolejson: any;
let voicejson: any;
(async () => {
  roleinfo = JSON.parse(await readFile('./data/json/roleinfo.json', 'utf-8'));
  roleinfo1 = JSON.parse(await readFile('./data/json/rolede.json', 'utf-8'));
  rolejson = new Map(JSON.parse(await readFile('./data/json/rolejson.json', 'utf-8')));
  voicejson = new Map(JSON.parse(await readFile('./data/json/voice.json', 'utf-8')));
})();
const role: re<Request, Response> = {
  async rolelist(req, res) {
    let data: any;
    let data1: any;
    if (req.params.id === 'enemy') {

      data = roleinfo.filter((p: any) => String(p.id)[0] === '4' || String(p.id)[0] === '5');
      data1 = roleinfo1.filter((p: any) => String(p.id)[0] === '4' || String(p.id)[0] === '5');
    }
    else if (req.params.id === 'BeastGod') {
      data = roleinfo.filter((p: any) => String(p.id)[0] === '3');
      data1 = [];
    }
    else {
      data = roleinfo.filter((p: any) => String(p.id)[0] !== '3' && String(p.id)[0] !== '4' && String(p.id)[0] !== '5');
      data1 = roleinfo1.filter((p: any) => String(p.id)[0] !== '4' && String(p.id)[0] !== '5');
    }
    res.status(200).send({
      code: 200,
      data: {
        role: data,
        rolede: data1,
      },
      message: '獲取成功'
    });
  },
  async rolespine(req, res) {
    const { id } = req.query;
    const data = rolejson.get(id);
    if (!data) {
      return res.status(400).send({
        code: 400,
        message: '參數錯誤'
      });
    }
    res.status(200).send({
      code: 200,
      data: data,
      message: '獲取成功_' + id
    });
  },
  async vioce(req, res) {
    const data = voicejson.get(+req.params.id);
    res.status(200);
    if (!data) {
      return res.send({
        code: 200,
        data: {
          id: req.params.id,
          voice: []
        },
        message: '無'
      });
    }
    res.send({
      code: 200,
      data,
      message: '獲取成功_' + req.params.id
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