<template>
  <div class="top">
    <div class="expand" :class="{ 'expand1': clap }" @click.stop="click">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- <nav class="lang lang1">
      <div>key</div>
      <div>key</div>
      <div>key</div>
    </nav> -->
    <div class="mask" v-show="clap" @click="click"></div>
    <nav class="nav" :class="{ 'nav1': clap }" @click.stop>
      <div @click="topath('/')">home</div>
      <div @click="topath('/musume',1)">rolelist</div>
      <div @click="topath('/BeastGod',1)">roles</div>
      <div @click="topath('/enemy',1)">rolelist1</div>
      <div @click="topath('/info')">key</div>
      <!-- <nav class="lang">
        <div>key</div>
        <div>key</div>
        <div>key</div>
      </nav> -->
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { themes } from '@/scss';
import { useRouter } from 'vue-router';
import { devalue } from '@/hooks/scroll';
onMounted(() => {
  themes();
});

const clap = ref(false);
//遮罩層
const click = () => {
  clap.value = !clap.value;
};
window.matchMedia("(max-width:777px)").addEventListener('change', () => {
  clap.value = false;
});

const router = useRouter();
const topath = (path: string, value?: number) => {
  if (value) devalue();
  router.push({
    path: path
  });
  clap.value = false;
};
</script>

<style lang="scss" scoped>
@import './Top.scss';
</style>