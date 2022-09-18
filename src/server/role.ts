import request from "./request";

//角色列表
export const roles = (id: string) => request({
  url: `/rolelist/${id}`
});
//角色spine
export const rolesspine = (id: number) => request({
  url: `/rolespine?id=${id}`
});
//音頻
export const voices = (id: number) => request({
  url: `/voice/${id}`
});