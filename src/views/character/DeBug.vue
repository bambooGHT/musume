<template>
  <ul class="info-name">
    <li>
      <div>
        <select v-model="spine2d.debugcg.background">
          <option value="bg1.png">BG1</option>
          <option value="bg2.png">BG2</option>
          <option value="0x000000">0x000</option>
          <option value="0xffffff">0xFFF</option>
          <option value="0">Alpha: 0</option>
        </select>
        <span>background</span>
      </div>
    </li>
    <li>
      <div>
        <input type="number" name="debug" v-model="spine2d.blur.blur" step="2">
        <span>bg-blur</span>
      </div>
    </li>
    <li v-if="Role.currentspine !== toSpine.ROLES">
      <div>
        <input type="number" v-if="Role.currentspine === toSpine.MINROLE" v-model="spine2d.debugcg.minsize" step="100">
        <input type="number" v-else-if="Role.currentspine === toSpine.ROLE_1" v-model="spine2d.debugcg.size_1"
          step="100">
        <input type="number" v-else v-model="spine2d.debugcg.size" step="100">
        <span><span class="scale" @click="scale">scale</span>(600-5000)</span>
      </div>
    </li>
    <li>
      <label>
        <input type="radio" name="debug">
        <span>KEY</span>
      </label>
    </li>
    <li>
      <label>
        <input v-model="spine2d.debugcg.move" @input="spine2d.move(!spine2d.debugcg.move)" type="checkbox">
        <span>move</span>
      </label>
    </li>
    <li>
      <label>
        <input v-model="spine2d.debugcg.isanimas" type="checkbox">
        <span>ClickAnimation</span>
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox">
        <span>KEY</span>
      </label>
    </li>
    <li class="slot">
      <input class="height" id="debug" type="checkbox">
      <label class="hei" for="debug">DeBug(high memory usage) <span>▲</span></label>
      <ul>
        <li v-for="(p,key) of spine2d.debugcg.drawDebug">
          <label>
            <input type="checkbox" v-model="spine2d.debugcg.drawDebug[key]">
            <span>{{key}}</span>
          </label>
        </li>
      </ul>
    </li>
    <li class="slot">
      <input class="height" id="hei" type="checkbox">
      <label class="hei" for="hei">SLOT <span>▲</span></label>
      <ul @click.stop="indexs">
        <li v-for="(p,index) in spine2d.slot.value" @mouseenter="enter(index)"
          :title="p.currentMeshName??p.currentSpriteName" @mouseleave="leave(index)">
          <div :data-id="index" :key="new Date().getTime()">
            <input type="checkbox">
            <span>{{p.currentMeshName??p.currentSpriteName}}-{{index}}</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { spine2d } from '@/spine/index';
import { role } from '@/store';
import { toSpine } from '@/types/spine';

const Role = role();

watch(() => spine2d.debugcg.background, async (newvalue) => {
  await spine2d.loadbackground(newvalue);
});

let value = 0;
const scale = () => {
  if (Role.currentspine === toSpine.MINROLE) value = spine2d.debugcg.minsize;
  else if (Role.currentspine === toSpine.ROLE) value = spine2d.debugcg.size;
  else value = spine2d.debugcg.size_1;
  if (value >= 600 && value <= 5000) {
    spine2d.spine.scale.set(value / spine2d.spine.spineData.width);
  } else {
    alert('600-5000');
  }
};
watch(() => spine2d.debugcg.drawDebug, (newvalue) => {
  if (!newvalue.drawDebug) {
    for (let key in newvalue) {
      key !== 'drawDebug' && (spine2d.spine[key] = false);
    }
    setTimeout(() => {
      spine2d.spine['drawDebug'] = false;
    }, 10);
    return;
  }
  for (let key in newvalue) {
    spine2d.spine[key] = newvalue[key];
  }
}, {
  deep: true,
});

const click = ref<any>(false);
const blendMode = ref<number>(-1);
const index = ref<number>(-1);
const enter = (value: any) => {
  // console.log(Spine2d.spine.skeleton.slots[value]);
  spine2d.slot.value[value].blendMode != 26 &&
    (index.value = spine2d.slot.value[value].blendMode);
  spine2d.slot.value[value].blendMode = 26;
};
const leave = (value: any) => {
  click.value?.dataset?.id != value && (spine2d.slot.value[value].blendMode = index.value);
};
const indexs = (e: any) => {
  // console.log(e.target.checked);
  const value = e.target.parentNode.dataset.id;
  if (!value) return;
  if (e.target.tagName == 'INPUT') {
    spine2d.slot.value[value].color.a = e.target.checked ? 0 : 1;
    return;
  }
  if (click.value && click.value.dataset.id === value) {
    spine2d.slot.value[click.value.dataset.id].blendMode = blendMode.value;
    click.value.classList.remove('liback');
    click.value = false;
    return;
  }
  if (click.value) {
    spine2d.slot.value[click.value.dataset.id].blendMode = blendMode.value;
    click.value.classList.remove('liback');
  }
  e.target.parentNode.classList.add('liback');
  blendMode.value = index.value;
  click.value = e.target.parentNode;
};
</script>

<style lang="scss" scoped>
.info-name {
  height: 100%;
  overflow-y: auto;

  li {
    display: flex;
    line-height: 3.5rem;
    align-items: center;

    &:hover:not(.slot) {
      background-color: $ThemeC4 !important;
    }

    label,
    div {
      font-size: clamp(1.4rem, 1.2vw, 1.6rem);
      @include WH (100%);

      input,
      select {
        margin-left: 1%;
        width: 25%;
        line-height: 1.8rem;
        font-size: 1.4rem;
        outline: none;
      }

      .scale {
        width: auto;
        border: 1px solid #000;
        line-height: 2rem;
        height: 2rem;
        cursor: pointer;


        &:active {
          border: 1px solid red;
          color: red;
        }
      }

      select {
        text-align: center;
        border: 1px solid $ThemeC2;
        font-size: clamp(1.3rem, 1.2vw, 1.5rem);
      }

      span {
        display: inline-block;
        text-overflow: ellipsis;
        width: 70%;
      }
    }
  }

  .slot {
    flex-direction: column;

    &>input {
      display: none;

      &:checked {
        ~label {
          span {
            transform: rotateZ(180deg);
          }
        }

        ~ul {
          height: 100%;
        }
      }
    }

    .hei {
      width: 100%;
      background-color: $ThemeC5;
      position: sticky;
      top: 0;
      user-select: none;

      span {
        width: auto;
        line-height: 2.2rem;
        display: inline-block;
      }
    }

    ul {
      width: 100%;
      overflow: hidden;
      height: 0;

      li:nth-child(even) {
        background-color: $ThemeC7;
      }
    }
  }

  .liback {
    background-color: $ThemeC3 !important;
  }
}
</style>