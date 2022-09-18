export type roletype = {
  id: number;
  name: string;
  Weapons: string;
  pngurl: string;
};
export type rolist = {
  musume: roletype[];
  BeastGod: roletype[];
  enemy: roletype[];
};
export type voicetype = {
  id: number;
  voice: {
    name: string;
    UrlWav: string;
  }[];
  main: {
    [key: string]: {
      name: string;
      UrlWav: string;
    }[];
  };
};

export enum toSpine {
  ROLE,
  ROLE_1,
  ROLES,
  MINROLE
}

export type spinetype = {
  id: number;
  role: string;
  role_1: string;
  roles: string;
  minrole: string;
};
export type bg = 'bg1.png' | 'bg2.png' | '0x000000' | '0xffffff' | '0';
// export type currentspine = toSpine;
export type drawdebug = {
  drawDebug: boolean,
  drawBones: boolean,
  drawRegionAttachments: boolean,
  drawClipping: boolean,
  drawMeshHull: boolean,
  drawMeshTriangles: boolean,
  drawPaths: boolean;
  // drawBoundingBoxes: boolean,
};
export interface DEBUG {
  background: bg;
  size: number;
  size_1: number;
  minsize: number;
  repeat: boolean;
  isckickvoice: boolean;
  xy: number;
  timeScale: number;
  blur: number;
  drawDebug: drawdebug;
  move: boolean;
  isanimas: boolean;
  repeatanima: boolean;
  config?: boolean;
}