import { defineStore } from "pinia";
import type { rolist, toSpine } from '@/types/spine';
const role = defineStore('role', {
  state: () => ({
    rolelist: {} as rolist,
    rolelistde: {} as rolist,
    currentspine: -1 as toSpine,
    voice: new Map(),
    isvoice: false,
    level: 0,
    backsize: '0%',
    mian: '' as string | number
  }),
  actions: {

  }
});

export default role;