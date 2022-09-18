<template>
  <div class="info">
    <ul class="info-name info-id">
      <li>KEY</li>
      <li class="info-atter">
        <div>KEY</div>
        <div>VALUE</div>
      </li>
      <li class="info-atter">
        <div>KEY</div>
        <div>VALUE</div>
      </li>
      <li class="info-atter">
        <div>KEY</div>
        <div>VALUE</div>
      </li>
    </ul>
    <div class="info-to" v-if="spine2d.debugcg.config">
      <div class="info-to1">
        <div v-show="midel" @click="tab = Tab.INFO">INFO</div>
        <div @click="tab = Tab.AUDIO">VOICE</div>
        <div @click="tab = Tab.DEBUG">CONFIG</div>
      </div>
      <Transition name="toggles" mode="out-in">
        <attri v-if="midel && tab === Tab.INFO" />
        <Voice v-else-if="tab === Tab.AUDIO" />
        <DeBug v-else-if="tab===Tab.DEBUG" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { spine2d } from '@/spine';
import attri from './attri.vue';
import Voice from './Voice.vue';
import DeBug from './DeBug.vue';
const midel = ref(false);
enum Tab {
  INFO,
  AUDIO,
  DEBUG
}
const tab = ref<Tab>(Tab.INFO);
const block = (e: any) => {
  if (e.matches) {
    midel.value = false;
    tab.value === Tab.INFO && (tab.value = Tab.AUDIO);
  } else midel.value = true;
};
const block1 = (e: any) => {
  if (e.matches) {
    spine2d.debugcg.config = false;
  } else {
    spine2d.debugcg.config = true;
  };
};
const media = window.matchMedia(`(max-width:1119px)`);
const media1 = window.matchMedia(`(max-width:666px)`);
block(media);
media.addEventListener('change', block);
media1.addEventListener('change', block1);
onUnmounted(() => {
  media.removeEventListener('change', block);
  media1.removeEventListener('change', block1);
});
</script>

<style lang="scss" scoped>
.toggles-enter-active,
.toggles-leave-active {
  transition: all 0.3s ease;
}

.toggles-enter-from,
.toggles-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

.info {
  margin: 0 auto;
  @include WH(calc(29%));
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  @import './info.scss';

  .info-id {
    margin: 0.5rem 0 1rem;
    box-shadow: 0 0 1rem $ThemeC3;

    li:nth-child(1) {
      background-color: transparent;
      font-size: clamp(1.8rem, 1.4vw, 2.3rem);

    }
  }

  &-to {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 1rem $ThemeC3;
  }

  &-to1 {
    display: flex;
    border: 0.2rem solid $ThemeC3;
    font-size: clamp(1.4rem, 1.4vw, 1.8rem);
    height: 2.8rem;
    position: relative;
    line-height: 2.8rem;
    margin-bottom: -0.2rem;
    background-color: rgb(255, 255, 255);

    div {
      @extend %cur1;
      flex: 1;

      &:hover {
        background-color: $ThemeC4;
      }
    }
  }

  @media screen and (max-width:800px) {
    margin-top: 1rem;
    @include WH(97vw, auto);

    .info-id {
      order: 1;
    }

    &-to {
      max-height: 24.9rem;
    }
  }
}
</style>