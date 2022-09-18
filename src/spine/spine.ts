export { };
// import {
//   Loader,
//   Sprite,
//   filters,
//   settings,
//   Application,
//   ALPHA_MODES, SCALE_MODES, Ticker,
// } from 'pixi.js';

// import type { LoaderResource } from 'pixi.js';
// import type { bg } from '@/types/spine';
// import { Spine } from 'pixi-spine';
// import type { Spine as spinetype } from 'pixi-spine';
// import { throttle } from '@/utils/throttle';

// // import './deb.js';

// const app = new Application({
//   width: 2700,
//   height: 2200,
//   // backgroundColor: 0x000000,
//   // backgroundAlpha: 0
// });
// app.stage.interactive = true;
// settings.RESOLUTION = window.devicePixelRatio;

// const meta = {
//   metadata: { imageMetadata: { alphaMode: ALPHA_MODES.PMA } }
// };
// //缓存
// const loader = new Loader();
// // const pre=(res:LoaderResource,next:any)=>{
// //   console.log(res);
// //   next()
// // }
// const loadTexture = (value: string): Promise<LoaderResource> =>
//   new Promise((resolve) => {
//     if (loader.resources[value]) {
//       resolve(loader.resources[value]);
//     }
//     loader.add(value, meta).load((loaders, res) => {
//       resolve(res[value]);
//     });
//   });

// //背景模糊
// const blur = new filters.BlurFilter();
// let BG: boolean;
// //背景
// const background = async (value: bg) => {
//   // const png = Sprite.from('/M.png');
//   removebg();
//   if (value.indexOf('0x') !== -1) {
//     app.renderer.backgroundColor = 0;
//     app.renderer.backgroundAlpha = 1;
//     app.renderer.backgroundColor = +value;
//   } else if (value === '0') {
//     app.renderer.backgroundColor = 0;
//     app.renderer.backgroundAlpha = 0;
//   } else {
//     const res = await loadTexture(value);
//     const png = new Sprite(res.texture);
//     png.width = png.width * 4;
//     png.position.set(-(png.width - app.renderer.width) / 2, 0);
//     png.filters = [blur];
//     png.height = png.height * 4;
//     app.stage.addChildAt(png, 0);
//     BG = true;
//   }
// };
// const removebg = () => BG && (BG = false, app.stage.removeChildAt(0));

// type keys = {
//   [key: string]: boolean;
// };
// type animas = { name: string; duration: number; };

// const Spine2d = {
//   // spine: {} as spinetype,
//   spine: {} as spinetype,
//   animation: [] as animas[],
//   //動畫列表
//   animalist: [] as Array<string>,
//   Ticker: new Ticker(),
//   key: {} as keys,
//   //切換默認動畫
//   down: false,
//   //當前播放的動畫
//   setanima: true,
//   //限制键盘事件
//   keylist: ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
//     'x', 'z', 'c', 'v'],
//   //鍵盤操作移動速度
//   xy: 2,
//   //動畫速度
//   timeScale: 1.4,
//   //spine
//   async spinenew(id: string, size: number, height: number) {
//     const res = await loadTexture(id);
//     // res.spineAtlas?.pages.forEach(p => {
//     //   p.baseTexture.scaleMode = SCALE_MODES.NEAREST;
//     // });

//     const spine = new Spine(res.spineData!);
//     spine.interactive = true;
//     spine.cursor = 'pointer';
//     spine.position.set(app.renderer.width / 2, app.renderer.height / height);
//     spine.scale.set(size / spine.width);
//     this.animation = spine.skeleton.data.animations;
//     let anima = this.animation.find((p: { name: string; }) => p.name === 'wait') ?? this.animation[0];
//     this.animalist = [anima.name];
//     // spine.state.addListener({
//     //   complete: function (entry) { console.log('播放完成'); },
//     // });
//     spine.state.setAnimation(0, anima.name, true);
//     this.spine = spine;
//     // spine.drawDebug = true;
//     // spine.drawBones = true;
//     // spine.drawRegionAttachments = true;
//     // spine.drawClipping = true;
//     // spine.drawMeshHull = true;
//     // spine.drawMeshTriangles = true;
//     // spine.drawPaths = true; //高消耗

//     // spine.drawBoundingBoxes = true;
//   },
//   addanimas: {
//     complete: () => {
//       let { spine, addanimas, key, down } = Spine2d;
//       key['z'] = false;
//       key['x'] = false;
//       key['c'] = false;
//       key['v'] = false;
//       Spine2d.setanima = true;
//       const value = Object.values(key).find(p => p == true);
//       if (!value) down = false;
//       down ? spine.state.setAnimation(0, 'walk', true) :
//         spine.state.setAnimation(0, 'wait', true);
//       spine.state.removeListener(addanimas);
//     }
//   },
//   //键盘事件定时器
//   debo(animation: animas) {
//     throttle(() => {
//       this.spine.state.setAnimation(0, animation.name, true);
//       this.spine.state.timeScale = 1;
//       if (this.setanima) this.spine.state.addListener(this.addanimas);
//       this.setanima = false;
//       // this.spine.state.addAnimation(0, 'wait', true, this.setanima.mixDuration);
//     }, 250);
//   },
//   //鍵盤事件
//   keyboard(boo?: boolean) {
//     if (boo) {
//       console.log(1111);
//       window.removeEventListener("keydown", this.keydown);
//       window.removeEventListener("keyup", this.keyup);
//       return;
//     }
//     console.log(2222);
//     window.addEventListener("keydown", this.keydown);
//     window.addEventListener("keyup", this.keyup);
//   },
//   keydown(e: any) {
//     if (!this.keylist.find(p => p === e.key)) return;
//     const { key, spine, Ticker, animation } = this;
//     key[e.key] = true;
//     if (e.key === 'x') {
//       this.debo(animation[0]);
//       return;
//     }
//     if (e.key === 'z') {
//       this.debo(animation[1]);
//       return;
//     }
//     if (e.key === 'c') {
//       this.debo(animation[2]);
//       return;
//     }
//     if (e.key === 'v') {
//       this.debo(animation[4]);
//       return;
//     }
//     if (!this.down) {
//       this.key['z'] = false;
//       this.key['x'] = false;
//       this.key['c'] = false;
//       this.key['v'] = false;
//       this.down = true;
//       Ticker.add(this.loop, this);
//       Ticker.start();
//       spine.state.setAnimation(0, 'walk', true);
//       // if (this.currentanima !== 'walk') {
//       // this.currentanima = 'walk';
//       // }
//       spine.state.timeScale = this.timeScale;
//     }
//   },
//   keyup(e: any) {
//     if (this.keylist.slice(4).find(p => p === e.key)) return;
//     if (!this.keylist.slice(0, 4).find(p => p === e.key)) return;
//     const { key, spine } = this;
//     key[e.key] = false;
//     const value = Object.values(key).find(p => p == true);
//     if (!value) {
//       this.down = false;
//       spine.state.setAnimation(0, 'wait', true);
//       // this.currentanima = 'wait';
//       spine.state.timeScale = 1;
//       this.Ticker.remove(this.loop, this);
//     }
//     // this.Ticker.remove(this.removes, this);
//   },
//   //鍵盤偵聽器
//   loop() {
//     const { key, spine, xy } = this;
//     if (key['z'] || key['x'] || key['c'] || key['v']) return;
//     if (key['ArrowLeft']) {
//       if (spine.scale.x > 0) {
//         spine.scale.x = -spine.scale.x;
//       }
//       spine.x -= xy;
//     };
//     if (key['ArrowUp']) spine.y -= xy;
//     if (key['ArrowRight']) {
//       if (spine.scale.x < 0) {
//         spine.scale.x = Math.abs(spine.scale.x);
//       }
//       spine.x += xy;
//     };
//     if (key['ArrowDown']) spine.y += xy;
//   },
//   //animation
//   anima(boo: boolean) {
//     if (boo && this.animation.length > 1) this.spine.on('click', async () => {
//       const animationName = await this.musicShuffle();
//       this.spine.state.setAnimation(0, animationName, true);
//     });
//     else app.stage.off('click');
//   },
//   //animation随机去重
//   musicShuffle(): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const { animalist, animation } = this;
//       //筛选anima
//       const indexarr = animation.filter(item => !animalist.includes(item.name));
//       const index = indexarr[Math.floor((Math.random() * indexarr.length))].name;
//       if (animalist.length <= 5 && animalist.length === animation.length - 1) {
//         animalist.splice(0, 1).push(index);
//       }
//       // if (animation.length <= 5 && animalist.length < animation.length - 1) {
//       //   animalist.push(index);
//       // }
//       if (animalist.length > 5 && animation.length > 5) {
//         animalist.splice(0, 1);
//         animalist.push(index);
//       }
//       if (animalist.length <= 5 && animation.length > 5) {
//         animalist.push(index);
//       }
//       resolve(animalist[animalist.length - 1]);
//     });
//   },
//   //移動
//   move(boo: boolean) {
//     if (!boo) {
//       this.spine.off('pointerdown');
//       return;
//     }
//     const { spine } = this;
//     this.spine.on('pointerdown', (e: any) => {
//       const X = e.data.global.x - spine.x;
//       const Y = e.data.global.y - spine.y;
//       document.onmousemove = () => {
//         spine.x = e.data.global.x - X;
//         spine.y = e.data.global.y - Y;
//         spine.x > 2700 && (spine.x = 2700);
//         spine.x < 0 && (spine.x = 0);
//         spine.y > 2100 && (spine.y = 2100);
//         spine.y < 0 && (spine.y = 0);
//       };
//       document.onmouseup = () => {
//         document.onmousemove = null;
//         document.onmouseup = null;
//       };
//     });
//   },
//   //加載過渡
//   removes(delta: number) {
//     let stagespine = app.stage.children[1] ?? app.stage.children[0];
//     // stagespine.alpha -= 0.08 * delta;
//     stagespine.alpha -= 0.03;
//     if (stagespine.alpha < 0) {
//       app.stage.removeChild(stagespine);
//       this.spine.alpha = 0;
//       app.stage.addChild(this.spine);
//       this.Ticker.add(this.add, this);
//       this.Ticker.start();
//       this.Ticker.remove(this.removes, this);
//     };
//   },
//   add(delta: number) {
//     // this.spine.alpha += 0.08 * delta;
//     this.spine.alpha += 0.03;
//     if (this.spine.alpha > 1) {
//       this.Ticker.remove(this.add, this);
//     };
//   },
//   //移除&添加
//   remove_add(boo?: boolean) {
//     const { spine, Ticker } = this;
//     if (boo) {
//       app.stage.removeChild(spine);
//       return;
//     }
//     if (!BG && !app.stage.children[0]) {
//       spine.alpha = 0;
//       app.stage.addChild(spine);
//       Ticker.add(this.add, this);
//     } else this.Ticker.add(this.removes, this);
//     Ticker.start();
//   },
// };

// export {
//   app,
//   blur,
//   Spine2d,
//   background,
//   removebg
// };



// //spine實例
// // const spine2d = async (id: string): Promise<spinetype> => {

// //   const res = await loadTexture(id);
// //   const spine2d = new Spine(res.spineData!);
// //   spine2d.interactive = true;
// //   spine2d.cursor = 'pointer';
// //   spine2d.position.set(app.renderer.width / 2, app.renderer.height / 2);
// //   spine2d.scale.set(1900 / spine2d.width);

// //   //spine animation
// //   const arrAnimation = spine2d.skeleton.data.animations;
// //   spine2d.state.setAnimation(0, arrAnimation[0].name, true);
// //   arrAnimation.length > 5 && app.stage.on('click', () => {
// //     let animationName = arrAnimation[Math.floor((Math.random() * arrAnimation.length))].name;
// //     spine2d.state.setAnimation(0, animationName, true);
// //   });
// //   app.stage.addChild(spine2d);
// //   return spine2d;
// // };