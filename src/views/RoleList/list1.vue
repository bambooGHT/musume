<template>
  <div style="padding-bottom: 1.5rem;">
    <div class="type">ALL</div>
    <ul class="role">
      <li class="rolelist" v-for="p of (Role as any).rolelist[route.params.id+'']" @click="topath(p.id)">
        <div class="rolelist-png">
          <img src="@/assets/face.png" alt="">
          <img v-show="p.pngurl" :src="p.pngurl" alt="">
        </div>
        <div class="rolelist-info">{{ p.name }}</div>
        <div class="rolelist-info">{{ p.Weapons }}</div>
      </li>
    </ul>
    <template v-if="(Role as any).rolelistde[route.params.id+'']">
      <div class="type">DE</div>
      <ul class="role">
        <li class="rolelist" v-for="p of (Role as any).rolelistde[route.params.id+'']" @click="topath(p.id)">
          <div class="rolelist-png">
            <img src="@/assets/face.png" alt="">
            <img v-show="p.pngurl" :src="p.pngurl" alt="">
          </div>
          <div class="rolelist-info">{{ p.name }}</div>
          <div class="rolelist-info">{{ p.Weapons }}</div>
        </li>
      </ul>
    </template>
  </div>
</template>
<script lang="ts" setup>
import hooks from './hooks';
const { route,
  Role,
  topath } = hooks();
</script>
<style lang="scss" scoped>
@import './role.scss';

.role {
  @extend %role;

  &list {
    &-png {
      margin: 0 auto;
      position: relative;
      @include WH(clamp(9.5rem, 6.7vw, 12.5rem), auto);
      overflow: hidden;
      border-radius: 27px;
      img {
        display: block;
        width: 100%;

        &:nth-child(1) {
          top: 0;
          position: relative;
          z-index: 1;
        }

        &:nth-child(n+2) {
          object-fit: cover;
          width: 91%;
          height: 91%;
          top: 0.4rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          position: absolute;
        }
      }
    }

    &-info {
      text-align: center;
    }
  }
}
</style>