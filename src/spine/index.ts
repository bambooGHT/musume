import {
  Sprite,
  filters,
  settings,
  Application,
  ALPHA_MODES, SCALE_MODES, Ticker
} from 'pixi.js';
import type { LoaderResource, Application as apptype } from 'pixi.js';
// import { Assets } from '@pixi/assets';
import { Spine } from 'pixi-spine';
import type { Spine as spinetype } from 'pixi-spine';
import type { bg, DEBUG } from '@/types/spine';
import { reactive, ref } from 'vue';
import audio from './audio';
import './deb.js';
import { throttle } from '@/utils/throttle';
type keys = {
  [key: string]: boolean;
};
type animatype = {
  name: string; duration: number;
};
type list = {
  name: string, UrlWav: string;
};
interface debug {
  drawDebug: boolean;
  drawBones: boolean;
  drawRegionAttachments: boolean;
  drawClipping: boolean;
  drawMeshHull: boolean;
  drawMeshTriangles: boolean;
  drawPaths: boolean;
};

class app {
  //PIXI實例
  readonly app: apptype = new Application({
    width: 2700,
    height: 2300,
  });
  readonly meta = { metadata: { imageMetadata: { alphaMode: ALPHA_MODES.PMA } } };
  //緩存進度
  Loading = ref<number>(0);
  errors = ref<boolean>(false);
  set = -1;
  //緩存
  loader = this.app.loader;
  settime = (value: number) => {
    this.set = setTimeout(() => {
      if (this.Loading.value < value && !this.errors.value) {
        this.Loading.value += 1;
        backsize.value = this.Loading.value + '%';
        this.settime(value);
      };
    }, 5);
  };
  #onProgress(loader: any, resource: LoaderResource) {
    // console.dir(resource.name.indexOf('bg') === -1);
    resource.name.indexOf('bg') === -1 && (
      clearTimeout(this.set),
      //資源百分比
      this.settime(loader.progress)
    );
  }
  #onError(err: Error, loader: any, resource: LoaderResource) {
    this.loader.destroy();
    this.errors.value = true;
    backsize.value = '0%';
  }
  protected loadTexture(value: string): Promise<LoaderResource> {
    const { loader, meta } = this;
    return new Promise(async (resolve) => {
      if (loader.resources[value]) {
        resolve(loader.resources[value]);
        return;
      }
      // if (value.indexOf('bg') === -1) {
      //   // Assets.add('value', value, meta);
      //   // console.log(222, Assets);
      // }
      value.indexOf('bg') === -1 && (
        //更改進度
        this.Loading.value = 0,
        backsize.value = '0%'
      );
      loader.add(value, meta).load((loaders, res) => {
        resolve(res[value]);
      });
    });
  }

  constructor() {
    this.app.stage.interactive = true;
    settings.RESOLUTION = window.devicePixelRatio;
    //加載中
    this.loader.onProgress.add(this.#onProgress.bind(this));
    //加載失敗
    this.loader.onError.add(this.#onError.bind(this));
    console.log('Application_' + this.app.stage.interactive);
  }
}

class background extends app {
  constructor() {
    super();
  }
  //背景模糊
  readonly blur = new filters.BlurFilter();
  //背景判斷
  withbg = <boolean>false;
  //背景加載
  async loadbackground(value: bg) {
    const { app, blur } = this;
    this.removebg();
    if (value.indexOf('0x') !== -1) {
      app.renderer.backgroundColor = 0;
      app.renderer.backgroundAlpha = 1;
      app.renderer.backgroundColor = +value;
    } else if (value === '0') {
      app.renderer.backgroundColor = 0;
      app.renderer.backgroundAlpha = 0;
    } else {
      const res = await this.loadTexture(value);
      const png = new Sprite(res.texture);
      png.width = png.width * 4;
      png.position.set(-(png.width - app.renderer.width) / 2, 0);
      png.filters = [blur];
      png.height = png.height * 4;
      app.stage.addChildAt(png, 0);
      this.withbg = true;
    }
  }
  //移除背景
  removebg() { this.withbg && (this.withbg = false, this.app.stage.removeChildAt(0)); }
}
class Spine2d extends background {
  debugcg = reactive({
    background: 'bg1.png',
    size: 1800,
    minsize: 1000,
    //重複播放
    repeat: true,
    size_1: 1500,
    blur: 0,
    drawDebug: {
      drawDebug: false,
      drawBones: false,
      drawRegionAttachments: false,
      drawClipping: false,
      drawMeshHull: false,
      drawMeshTriangles: false,
      drawPaths: false,
      // drawBoundingBoxes: false,
    },
    //按住移動
    move: false,
    //點擊動畫
    isanimas: false,
    //點擊語音
    isckickvoice: false,
    //鍵盤操作移動速度
    xy: 2,
    //鍵盤操作動畫速度
    timeScale: 1.4,
    config: true
  } as DEBUG);

  #keylist: string[] = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
    'x', 'z', 'c', 'v'];
  animation = ref<animatype[]>([]);
  animalist: string[] = [];
  // spine = {} as spinetype;
  spine = {} as spinetype;
  slot = ref<any>([]);
  //spine
  async newspine(id: string, size: number) {
    const { app, errors, debugcg } = this;
    this.errors.value = false;
    const res = await this.loadTexture(id);
    const spine = new Spine(res.spineData!);
    spine.interactive = true;
    spine.cursor = 'pointer';
    spine.position.set(app.renderer.width / 2, app.renderer.height / 2);
    if (size === 1) spine.scale.set(app.renderer.width / 1350);
    else spine.scale.set(size / spine.width);
    //動畫
    this.animation.value = spine.skeleton.data.animations;
    //插槽
    this.slot.value = spine.skeleton.slots;
    const anima = this.animation.value.find((p: { name: string; }) => p.name === 'wait') ?? this.animation.value[0];
    this.animalist = [anima.name];
    spine.state.setAnimation(0, anima.name, debugcg.repeat);
    this.spine = spine;
    if (errors.value) return;
    this.remove_add();
    this.anima();
    this.move(debugcg.move);
    if (!debugcg.drawDebug.drawDebug) return;
    for (const key in debugcg.drawDebug) {
      (spine as any)[key] = (debugcg as any).drawDebug[key];
    }
  }
  //鍵盤切换默认动画
  private keydowns = false;
  //是否有complete偵聽
  private complete = false;
  private key = {} as keys;
  #isanima: string = '';
  #iskeydown = false;
  private KEYdown = this.keydown.bind(this);
  private KEYup = this.keyup.bind(this);
  //鍵盤事件
  keyboard(boo?: boolean) {
    if (boo) {
      window.removeEventListener("keydown", this.KEYdown);
      window.removeEventListener("keyup", this.KEYup);
      return;
    }
    window.addEventListener("keydown", this.KEYdown);
    window.addEventListener("keyup", this.KEYup);
  }
  debo(animation: animatype) {
    const { spine } = this;
    if (this.#isanima !== animation.name) {
      spine.state.setAnimation(0, animation.name, false);
      spine.state.timeScale = 1;
    };
    if (!this.complete) {
      this.complete = true;
      spine.state.addListener(this.#completes);
    }
    this.#isanima = animation.name;
    this.#iskeydown = true;
  }
  //動畫complete偵聽
  #completes = {
    complete: () => {
      const { spine, key } = this;
      if (this.#iskeydown) {
        spine.state.setAnimation(0, this.#isanima, false);
        return;
      };
      this.#keylist.slice(4).forEach(p => key[p] = false);
      const value = this.#keylist.slice(0, 4).some(p => key[p] === true);
      if (value) {
        spine.state.setAnimation(0, 'walk', true);
        spine.state.timeScale = this.debugcg.timeScale;
      } else spine.state.setAnimation(0, 'wait', true);
      this.#isanima = '';
      this.complete = false;
      spine.state.removeListener(this.#completes);
    }
  };
  //偵聽器
  #Ticker = new Ticker();
  //按下
  keydown(e: any) {
    if (!this.#keylist.some(p => e.key == p)) return;
    const { key, spine } = this;
    key[e.key] = true;
    if (e.key === 'x') {
      this.debo(this.animation.value[0]);
      return;
    }
    if (e.key === 'z') {
      this.debo(this.animation.value[1]);
      return;
    }
    if (e.key === 'c') {
      this.debo(this.animation.value[2]);
      return;
    }
    if (e.key === 'v') {
      this.debo(this.animation.value[4]);
      return;
    }
    if (!this.keydowns) {
      this.keydowns = true;
      this.#keylist.slice(4).forEach(p => key[p] = false);
      this.#Ticker.add(this.loop, this);
      this.#Ticker.start();
      if (this.complete) {
        this.complete = false;
        this.#isanima = '';
        spine.state.removeListener(this.#completes);
      }
      spine.state.timeScale = this.debugcg.timeScale;
      spine.state.setAnimation(0, 'walk', true);
    }
  }
  //鬆開
  keyup(e: any) {
    if (this.#keylist.slice(4).find(p => p === e.key)) {
      this.#iskeydown = false;
      return;
    }
    if (!this.#keylist.slice(0, 4).some(p => e.key == p)) return;
    const { key, spine } = this;
    key[e.key] = false;
    const value = this.#keylist.slice(0, 4).some(p => key[p] === true);
    if (!value) {
      this.keydowns = false;
      if (!this.complete) spine.state.setAnimation(0, 'wait', this.debugcg.repeat);
      spine.state.timeScale = 1;
      this.#Ticker.remove(this.loop, this);
    }
  }
  //鍵盤偵聽
  loop() {
    const { key, spine, } = this;
    const { xy } = this.debugcg;
    if (this.#keylist.slice(4).some(p => key[p] === true)) return;
    if (key['ArrowLeft']) {
      if (spine.scale.x > 0) {
        spine.scale.x = -spine.scale.x;
      }
      spine.x -= xy;
    };
    if (key['ArrowUp']) spine.y -= xy;
    if (key['ArrowRight']) {
      if (spine.scale.x < 0) {
        spine.scale.x = Math.abs(spine.scale.x);
      }
      spine.x += xy;
    };
    if (key['ArrowDown']) spine.y += xy;
  }
  //動畫
  anima() {
    this.spine.on('click', () => {
      throttle(async () => {
        if (this.debugcg.isckickvoice && this.voicelist.length > 1) {
          const voiceurl = await this.#list1();
          this.play(voiceurl);
        }
        if (this.animation.value.length > 1 && this.debugcg.isanimas) {
          const animationName = await this.#list();
          this.spine.state.setAnimation(0, animationName, this.debugcg.repeat);
        }
      }, 500);
    });
  }
  //animation随机去重
  #list(): Promise<string> {
    return new Promise((resolve, reject) => {
      const { animalist, animation } = this;
      //筛选anima
      const indexarr = animation.value.filter((item: { name: string; }) => !animalist.includes(item.name));
      const index = indexarr[Math.floor((Math.random() * indexarr.length))].name;
      if (animalist.length <= 5 && animalist.length === animation.value.length - 1) {
        animalist.splice(0, 1).push(index);
      }
      if (animalist.length <= 5 && animation.value.length <= 5) {
        animalist.push(index);
      }
      if (animalist.length > 5 && animation.value.length > 5) {
        animalist.splice(0, 1);
        animalist.push(index);
      }
      if (animalist.length <= 5 && animation.value.length > 5) {
        animalist.push(index);
      }
      resolve(animalist[animalist.length - 1]);
    });
  }
  voice: list[] = [];
  voicelist: list[] = [];
  isaudio = ref(false);
  playbacksize = ref('0%');
  currentTime = ref('0');
  durationtime = ref('0');
  voicename = ref('');
  timeset = 0;
  //播放
  play(data: list) {
    this.voicename.value = data.name;
    this.isaudio && (this.#Ticker.remove(this.#playtime, this), clearTimeout(this.timeset));
    audio.src = data.UrlWav;
    audio.load();
    audio.play();
    this.setTimeout();
    this.#Ticker.add(this.#playtime, this);
    this.#Ticker.start();
    this.isaudio.value = true;
  }
  setTimeout() {
    this.timeset = setTimeout(() => {
      if (this.isaudio) {
        this.currentTime.value = this.voicetime(audio.currentTime);
        this.setTimeout();
      }
    }, 200);
  }
  #playtime() {
    this.playbacksize.value = audio.currentTime / audio.duration * 100 + '%';
    if (audio.currentTime === audio.duration) {
      this.#Ticker.remove(this.#playtime, this);
      this.isaudio.value = false;
    }
  }
  //語音時長轉換 a:秒数
  voicetime(a: number): string {
    const m = Math.floor((a / 60 % 60));
    const s = Math.floor((a % 60));
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }
  //語音去重
  #list1(): Promise<list> {
    return new Promise((resolve, reject) => {
      const { voice, voicelist } = this;
      //筛选anima
      const indexarr = voicelist.filter((item) => !voice.includes(item));
      const index = indexarr[Math.floor((Math.random() * indexarr.length))];
      if (voicelist.length <= 10 && voice.length === voicelist.length - 1) {
        voice.splice(0, 1).push(index);
      }
      if (voice.length <= 10 && voicelist.length <= 10) {
        voice.push(index);
      }
      if (voice.length > 10 && voicelist.length > 10) {
        voice.splice(0, 1).push(index);
      }
      if (voice.length <= 10 && voicelist.length > 10) {
        voice.push(index);
      }
      resolve(voice[voice.length - 1]);
    });
  }
  //移動
  move(boo: boolean) {
    if (!boo) {
      this.spine.off('pointerdown');
      return;
    }
    const { spine } = this;
    this.spine.on('pointerdown', (e: any) => {
      const X = e.data.global.x - spine.x;
      const Y = e.data.global.y - spine.y;
      document.onmousemove = () => {
        spine.x = e.data.global.x - X;
        spine.y = e.data.global.y - Y;
        spine.x > 2700 && (spine.x = 2700);
        spine.x < 0 && (spine.x = 0);
        spine.y > 2100 && (spine.y = 2100);
        spine.y < 0 && (spine.y = 0);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  }
  //加載過渡
  #removes(delta: number) {
    const { app, Loading } = this;
    const stagespine = app.stage.children[1] ?? app.stage.children[0];
    // stagespine.alpha -= 0.08 * delta;
    if (Loading.value !== 100 && stagespine.alpha >= 1) return;
    stagespine.alpha -= 0.03;
    if (stagespine.alpha < 0) {
      app.stage.removeChild(stagespine);
      this.spine.alpha = 0;
      app.stage.addChild(this.spine);
      this.#Ticker.add(this.#add, this);
      this.#Ticker.start();
      this.#Ticker.remove(this.#removes, this);
    };
  }
  #add(delta: number) {
    const { Loading, spine } = this;
    if (Loading.value !== 100 && spine.alpha === 0) return;
    // this.spine.alpha += 0.08 * delta;
    spine.alpha += 0.03;
    if (spine.alpha > 1) {
      this.#Ticker.remove(this.#add, this);
    };
  }
  //移除&添加
  remove_add(boo?: boolean) {
    const { spine, app, withbg } = this;
    if (boo) {
      app.stage.removeChild(spine);
      return;
    }
    if ((withbg && app.stage.children.length < 2) || app.stage.children.length === 0) {
      spine.alpha = 0;
      app.stage.addChild(spine);
      this.#Ticker.add(this.#add, this);
    } else this.#Ticker.add(this.#removes, this);
    this.#Ticker.start();
  }
}
export const spine2d = new Spine2d();
export const backsize = ref('0%');

audio.oncanplay = () => {
  spine2d.currentTime.value = spine2d.voicetime(audio.currentTime);
  spine2d.durationtime.value = spine2d.voicetime(audio.duration);
};
if (localStorage.getItem('DEBUG')) {
  spine2d.debugcg = Object.assign(spine2d.debugcg, JSON.parse(localStorage.getItem('DEBUG')!));
} else localStorage.setItem('DEBUG', JSON.stringify(spine2d.debugcg));
spine2d.blur.blur = spine2d.debugcg.blur;
window.onbeforeunload = () => {
  spine2d.debugcg.blur = spine2d.blur.blur;
  localStorage.setItem('DEBUG', JSON.stringify(spine2d.debugcg));
};