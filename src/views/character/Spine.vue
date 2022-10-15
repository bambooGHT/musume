<template>
  <div class="PIXIbox">
    <div class="PIXI" id="PIXI" ref="PIXIBOX">
    </div>
    <div class="toggle">
      <div @click="load(toSpine.MINROLE)" v-if="Spinejson.minrole">
        <span>min</span>
      </div>
      <div @click="load(toSpine.ROLE)" v-if="Spinejson.role"><span>{{Spinejson.id}}</span></div>
      <div @click="load(toSpine.ROLE_1)" v-if="Spinejson.role_1"><span>{{Spinejson.id}}_1</span>
      </div>
      <div @click="load(toSpine.ROLES)" v-if="Spinejson.roles"><span>{{Spinejson.id}}S</span>
      </div>
    </div>
    <div class="load">
      <transition name="song" mode="out-in">
        <div v-show="spine2d.Loading.value!==100">
          <span v-if="spine2d.errors.value">error:load failure</span>
          <span v-else-if="!spine2d.errors.value">Loading:{{backsize}}</span>
        </div>
      </transition>
    </div>
    <transition name="song1" mode="out-in">
      <div class="audio" v-show="spine2d.isaudio.value">
        <div class="name">{{spine2d.voicename.value}}</div>
        <div class="value"></div>
        <span>{{spine2d.currentTime.value}}</span>
        <span>{{spine2d.durationtime.value}}</span>
      </div>
    </transition>
    <div class="config" @click="spine2d.debugcg.config=!spine2d.debugcg.config">
      <div>config</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { rolesspine, voices } from '@/server/role';
import { useRoute } from 'vue-router';
import type { spinetype } from '@/types/spine';
import { toSpine } from '@/types/spine';
import { spine2d, backsize } from '@/spine/index';
import { role } from '@/store';
import { throttle } from '@/utils/throttle';

const Role = role();
const Spinejson = ref({} as spinetype);
//加載
const load = (value: toSpine) => {
  if (Role.currentspine === value) return;
  throttle(async () => {
    if (spine2d.loader.loading) {
      console.log('error_' + spine2d.loader.progress);
      // spine2d.loader.reset();
      // spine2d.loader.destroy();
      return;
    }
    spine2d.keyboard(true);
    Role.currentspine = value;
    if (value === toSpine.MINROLE) {
      await spine2d.newspine(Spinejson.value.minrole, spine2d.debugcg.minsize);
      spine2d.keyboard();
    }
    else if (value === toSpine.ROLE) await spine2d.newspine(Spinejson.value.role, spine2d.debugcg.size);
    else if (value === toSpine.ROLE_1) await spine2d.newspine(Spinejson.value.role_1, spine2d.debugcg.size_1);
    else await spine2d.newspine(Spinejson.value.roles, 1);
  }, 500);
  // boo.value = !boo.value;
};


const { playbacksize } = spine2d;

const route = useRoute();
let value = 0;
let Rolebox: any;
const PIXIBOX = ref();
const size = new ResizeObserver(entries => {
  value = entries[0].contentRect.width / 2700;
  PIXIBOX.value && (PIXIBOX.value.style.transform = `scale(${value})`);
  Rolebox.style.height = `${value * 2350}px`;
});
onMounted(async () => {
  document.documentElement.scrollTop = 0;
  //背景
  await spine2d.loadbackground(spine2d.debugcg.background);
  Rolebox = document.querySelector('.roleinfo');
  //获取json
  const resule = await rolesspine(+route.params.id);
  Spinejson.value = resule.data;

  PIXIBOX.value.appendChild(spine2d.app.view);
  if (resule.data.role) load(toSpine.ROLE);
  else if (resule.data.role_1) load(toSpine.ROLE_1);
  else if (resule.data.minrole) load(toSpine.MINROLE);
  else load(toSpine.ROLES);
  //监听元素
  size.observe(PIXIBOX.value);
  //語音
  const id = +String(route.params.id);
  const is = Role.voice.has(id);
  if (!is) {
    const data = await voices(id);
    Role.voice.set(id, data.data);
    data.data?.main && (Role.mian = Object.keys(data.data.main)[0]);
  }
  Role.isvoice = true;
  spine2d.voicelist = Role.voice.get(id).voice;
});

onUnmounted(() => {
  // localStorage.setItem('DEBUG', JSON.stringify(Role.debugcg));
  //移除Sprite
  spine2d.removebg();
  spine2d.remove_add(true);
  spine2d.keyboard(true);
  Role.currentspine = -1;
  Role.isvoice = false;
});
</script>

<style lang="scss" scoped>
.song-enter-active {
  transition: opacity 0.2s ease;
}

.song-leave-active {
  transition: opacity 0.2s ease 0.2s;
}

.song1-enter-from,
.song1-leave-to {
  opacity: 0;
}

.song1-enter-active {
  transition: opacity 0.3s ease;
}

.song1-leave-active {
  transition: opacity 0.3s ease 0.6s;
}

.song1-enter-from,
.song-leave-to {
  opacity: 0;
}

.PIXIbox {
  position: relative;
  @include WH(70%);
  min-height: 33rem;

  .load {
    position: absolute;
    top: 4rem;
    font-size: 2rem;
    width: 100%;
    text-align: center;

    div {
      width: 60%;
      margin: 0 auto;
      border: 2px solid $ThemeC3;
      color: $ThemeC1;
      background: -webkit-linear-gradient(left, $ThemeC4, $ThemeC4) no-repeat, transparent;
      background-size: v-bind(backsize);
    }
  }

  .audio {
    position: absolute;
    font-size: 2rem;
    bottom: 3rem;
    right: 2rem;
    width: 35%;
    font-size: 1.6rem;

    .name {
      text-align: center;
      margin-bottom: 0.4rem;
      color: $ThemeC3;
    }

    .value {
      @include WH(100%, 0.7rem);
      border-radius: 5px;
      background: -webkit-linear-gradient(left, #0099ff, #0099ff) no-repeat, #dfdfdf91;
      background-size: v-bind(playbacksize);
    }

    span {
      display: inline-block;
      width: 50%;
      color: $ThemeC3;
      box-sizing: border-box;
      padding: 0 1rem;

      &:nth-child(3) {
        text-align: right;
      }
    }
  }

  .config {
    bottom: 1rem;
    left: 1rem;
    position: absolute;
    color: $ThemeC2;
    border: 1px solid $ThemeC1;
    padding: 0 0.5rem;
    display: none;

    @media screen and (max-width:666px) {
      display: block;
    }

    div {
      @extend %size, %cur1;
    }
  }

  .toggle {
    top: 1rem;
    right: 0;
    position: absolute;
    display: flex;

    div {
      // border: 2px solid $ThemeC1;
      @extend %size, %cur1;
      position: relative;
      margin: 0 0.6rem;
      user-select: none;

      span {
        display: inline-block;
        padding: 0.3rem 0.5rem;
        height: 100%;
        color: rgb(0, 142, 207);
        mix-blend-mode: difference;
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        transition: .3s;
      }

      &::before {
        top: -2px;
        right: -2px;
        border-top: 2px solid $ThemeC1;
        border-right: 2px solid $ThemeC1;
      }

      &::after {
        left: -2px;
        bottom: -2px;
        border-bottom: 2px solid $ThemeC1;
        border-left: 2px solid $ThemeC1;
      }



      &:hover {

        &::before,
        &::after {
          width: calc(100% + 2px);
          height: calc(100% + 2px);
        }

        span {
          color: red;
        }
      }
    }
  }

  @media screen and (max-width:800px) {
    width: 100%;
  }
}

.PIXI {
  transform-origin: 0 0;
}
</style>