<template>
  <ul class="info-name">
    <li class="con">
      <label>
        <input type="checkbox" v-model="spine2d.debugcg.isckickvoice">
        <span>click random voice</span>
      </label>
    </li>
    <li class="con">
      <label>
        <input type="checkbox" v-model="spine2d.debugcg.repeat"
          @input="spine2d.spine.state.tracks[0].loop = !spine2d.debugcg.repeat">
        <span>animation repeat</span>
      </label>
    </li>
    <div class="name">Voice</div>
    <li class="info-voice">
      <div v-for="p in voice.voice" @click="spine2d.play(p)" :title="p.name">{{ p.name }}</div>
      <div v-if="voice.voice?.length<1">null</div>
    </li>
    <template v-if="voice.main">
      <div class="name">main</div>
      <li class="info-voice">
        <div class="main">
          <span v-for="(s,key) of voice.main" :class="{'back':Role.mian===key}" @click="Role.mian=key">{{key}}</span>
        </div>
        <div class="main1">
          <div class="lists" v-for="p of voice.main[Role.mian]" @click="spine2d.play(p)" :title="p.name" :key="p.name">
            {{p.name}}
          </div>
        </div>
      </li>
    </template>
    <template v-if="!spine2d.errors.value">
      <div class="name">animation</div>
      <li class="info-voice">
        <div v-for="p in spine2d.animation.value"
          @click="spine2d.spine.state.setAnimation(0, p.name, spine2d.debugcg.repeat)" :title="p.name">{{p.name }}
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { spine2d } from '@/spine';
import { role } from '@/store';
import { storeToRefs } from 'pinia';
const Role = role();
const { voice } = storeToRefs(Role);
</script>

<style lang="scss" scoped>
.info-name {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.con {
  line-height: 3.5rem;

  &:hover {
    background-color: $ThemeC1;
  }

  label {
    font-size: clamp(1.4rem, 1.2vw, 1.6rem);
    @include WH (100%);


    input {
      margin-left: 1%;
      width: 25%;
      line-height: 1.8rem;
      font-size: 1.4rem;
      outline: none;
    }

    span {
      display: inline-block;
      text-overflow: ellipsis;
      width: 70%;
    }
  }
}


.name {
  border: 1px solid $ThemeC3;
  @include WH(auto, 3rem);
  line-height: 3rem;
  margin: 0.5rem;
  box-sizing: border-box;
  @extend %size;
  background-color: $ThemeC3;
}

.info-voice {
  display: flex;
  flex-wrap: wrap;

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    @extend %size;
    margin: 0.5rem;
    @include WH(40%, 3rem);
    flex-grow: 1;
    line-height: 3rem;
    box-sizing: border-box;
    @extend %cur1;
    border: 1px solid $ThemeC3;

    &:not(.main, .main1):hover {
      background-color: $ThemeC1;
    }
  }

  .main {
    @include WH(100%, 3.2rem);
    text-overflow: clip;
    overflow: auto;
    border: 0;

    &::-webkit-scrollbar {
      display: none;
    }

    span {
      display: inline-block;
      width: 40%;
      margin: 0 0.5rem;
      @extend %cur1;
      background-color: $ThemeC5;

      &:hover {
        background-color: $ThemeC1;
      }
    }

    .back {
      background-color: $ThemeC3;
    }
  }

  .main1 {
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (max-width:777px) {
    height: auto;

    div {
      width: 20%;
      @include WH(20%, 3.2rem);
      line-height: 3.2rem;
    }
  }
}
</style>