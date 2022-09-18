<template>
  <div class="infos">
    <div>使用技術</div>
    <div class="infos-box">
      <ul>
        <li>vue</li>
        <li v-for="(p,key) of arr">
          <span>"{{key}}"</span>
          <span>"{{p}}"</span>
        </li>
        <li>github
          <a href="" target="_blank"></a>
        </li>
      </ul>
      <ul>
        <li>node</li>
        <li v-for="(p,key) of arr1">
          <span>"{{key}}"</span>
          <span>"{{p}}"</span>
        </li>
        <li>github
          <a href="" target="_blank"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const arr = {
  "axios": "^0.27.2",
  "pinia": "^2.0.21",
  "pixi-spine": "^3.1.0",
  "pixi.js": "^6.5.3",
  "vue": "^3.2.39",
  "vue-router": "^4.1.5",
  "@vitejs/plugin-vue": "^3.0.3",
  "sass": "^1.54.5",
  "typescript": "^4.6.4",
  "vite": "^3.1.1",
  "vue-tsc": "^0.39.5"
};
const arr1 = {
  "@types/node": "^18.7.13",
  "express": "^4.18.1",
  "ts-node": "^10.9.1",
  "typescript": "^4.8.2",
  "@types/express": "^4.17.13"
};
</script>

<style lang="scss" scoped>
.infos {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: clamp(1.6rem, 1.2vw, 2.2rem);
  box-sizing: border-box;

  &-box {
    width: 100%;
    border: 2px solid $ThemeC3;
    box-shadow: 0 0 0.5rem rgb(61, 61, 61);
    display: flex;

    ul {
      margin: 1rem;
      width: calc(50% - 1rem);

      li {
        span {
          display: inline-block;
          width: 50%;
          padding: 0.5rem 0;

          &:nth-child(1) {
            background-color: $ThemeC8;
          }

          &:nth-child(2) {
            background-color: $ThemeC7;
          }
        }
      }
    }
  }

  &-a {
    margin-top: 1rem;
  }
}
</style>