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
        <li></li>
        <li>github
          <a href="https://github.com/bambooGHT/musume/tree/musume-tag" target="_blank">musume-tag</a>
        </li>
      </ul>
      <ul>
        <li>express</li>
        <li v-for="(p,key) of arr1">
          <span>"{{key}}"</span>
          <span>"{{p}}"</span>
        </li>
        <li></li>
        <li>github
          <a href="" target="_blank">musume-api</a>
        </li>
      </ul>
    </div>
    <div class="infos-a">代碼寫的很爛,目前還有bug</div>
    <div class="infos-a">能力有限,如果有會逆向的巨巨能幫忙,我可以重寫</div>
    <div class="infos-a">聯係:
      <a href="mailto:2942402900@qq.com">2942402900@qq.com</a> ||
      <a href="mailto:bamboo-get@outlook.com">bamboo-get@outlook.com</a>
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
  width: 90%;
  margin: 0 auto;
  text-align: center;
  font-size: clamp(1.6rem, 1.4vw, 2.2rem);
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

        a {
          color: rgb(0, 0, 238);
        }
      }
    }

    @media screen and (max-width:1050px) {
      flex-direction: column;

      ul {
        width: calc(100% - 1rem);

        li {
          width: 80%;
          margin: 0 auto;
        }
      }
    }

    @media screen and (max-width:666px) {
      ul {
        display: flex;
        flex-wrap: wrap;

        li:nth-child(n+2) {
          width: 50%;

          span {
            width: 100%;
          }
        }

        li:nth-last-child(1) {
          width: 100%;
        }
      }
    }
  }

  &-a {
    margin-top: 1rem;
  }
}
</style>