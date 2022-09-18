<template>
  <div style="padding-bottom: 1.5rem;">
    <div class="type">ALL</div>
    <ul class="role">
      <li class="rolelist" v-for="p of (Role as any).rolelist[route.params.id+'']" @click="topath(p.id)">
        <div class="rolelist-png">
          <img src="@/assets/SSR-Face.png" alt="">
          <img v-show="p.pngurl" :src="p.pngurl" alt="">
          <img src="@/assets/type.png" alt="">
          <img src="@/assets/job.png" alt="">
        </div>
        <div class="rolelist-info">{{ p.name }}</div>
        <div class="rolelist-info">{{ p.Weapons }}</div>
      </li>
    </ul>
    <template v-if="(Role as any).rolelistde[route.params.id+'']?.length>0">
      <div class="type">DE</div>
      <ul class="role">
        <li class="rolelist" v-for="p of (Role as any).rolelistde[route.params.id+'']" @click="topath(p.id)">
          <div class="rolelist-png">
            <img src="@/assets/SSR-Face.png" alt="">
            <img v-show="p.pngurl" :src="p.pngurl" alt="">
            <img src="@/assets/type.png" alt="">
            <img src="@/assets/job.png" alt="">
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

      img {
        display: block;
        width: 100%;

        &:nth-child(1) {
          position: relative;
          z-index: 2;
        }

        &:nth-child(n+2) {
          top: 0;
          position: absolute;
        }

        &:nth-child(2) {
          object-fit: cover;
          width: 84%;
          height: 83.5%;
          left: 5.4%;
          right: 0;
          bottom: 0;
          top: 0.1rem;
          margin: auto;
        }

        &:nth-child(3) {
          width: 18.5%;
          right: 3.8%;
          top: 6.3%;
          z-index: 2;
        }

        &:nth-child(4) {
          width: 21%;
          left: 7.2%;
          top: 4.5%;
          z-index: 2;
        }
      }
    }

    &-info {
      text-align: center;
    }
  }
}
</style>