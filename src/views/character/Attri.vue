<template>
  <div class="attri">
    <ul class="info-lv info-name">
      <li>KEY</li>
      <li>
        <input v-model="Role.level" class="ranges" type="range" min="1" max="100" size="1">
        <input v-model="Role.level" class="num" type="number">
      </li>
      <hr>
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
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <ul class="info-name info-po">
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
      <li class="info-atter">
        <div>KEY</div>
        <div>VALUE</div>
      </li>
      <li class="info-atter">
        <div>KEY</div>
        <div>VALUE</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { role } from '@/store';
import { storeToRefs } from 'pinia';
const Role = role();
const { backsize } = storeToRefs(Role);
watch(() => Role.level, (newvalue) => {
  backsize.value = newvalue / 100 * 100 + '%';
});

</script>

<style lang="scss" scoped>
@import './info.scss';

.attri {
  display: flex;
  flex-direction: column;
  @include WH(100%);
}

.info-lv {
  flex: 1;
  display: flex;

  hr {
    width: 70%;
    border: 1px solid $ThemeC3;
    margin: 0.2rem auto;
  }
}

.ranges {
  @include WH(95%, 5px);
  outline: 0;
  border-radius: 20px;
  background-color: transparent;
  vertical-align: middle;
  -webkit-appearance: none;
  cursor: pointer;
  position: relative;
  background: $ThemeC9;
}

@media screen and (min-width:1120px) {
  .info-lv {
    flex-direction: column;

    .info-atter {
      flex: 1;
      align-items: center;

      div {
        height: auto;
        line-height: 2rem;
      }
    }
  }
}

@media screen and (max-width:1119px) {
  .attri {
    flex-direction: row;
  }

  .info-po {
    text-align: center;
    width: 20%;
  }

  .info-lv {
    width: 70%;
    flex-wrap: wrap;
    text-align: center;

    li {
      flex-direction: column;
      min-width: 15.5rem;
      flex-grow: 1;
      width: 15.5rem;

      div {
        width: 100%;
        height: 2.6rem;
        line-height: 2.6rem;
      }

      &:nth-child(-n+2) {
        width: 100%;
        max-width: 100%;
      }
    }

    hr {
      display: none;
    }
  }
}

@media screen and (max-width:666px) {
  .attri {
    flex-direction: column;
  }
  .info-lv,
  .info-name {
    width: 100%;
  }
}

.ranges::-webkit-slider-thumb {
  -webkit-appearance: none;
  @include WH(15px, 15px);
  border-radius: 50%;
  margin-top: -5px;
  box-shadow: 0 0 0.7rem rgba($color: #000000, $alpha: .5);
  background-color: #00bbff;
}

.ranges::-moz-range-thumb {
  -moz-appearance: none;
  @include WH(15px, 15px);
  border-radius: 50%;
  background-color: #00bbff;
  box-shadow: 0 0 0.7rem rgba($color: #000000, $alpha: .5);
}

.ranges::-ms-thumb {
  @include WH(15px, 15px);
  border-radius: 50%;
  background-color: #00bbff;
  box-shadow: 0 0 0.7rem rgba($color: #000000, $alpha: .5);
}

.ranges::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 20px;
  background: -webkit-linear-gradient(left, $ThemeC2, $ThemeC2) no-repeat;
  background-size: v-bind(backsize);
}

.ranges::-webkit-slider-thumb:active {
  background-color: #38caff;
}

.num {
  @include WH(5rem, 2rem);
  outline: 0;
  box-sizing: border-box;
  vertical-align: middle;
  -webkit-appearance: none;
  border: 1px solid $ThemeC22;
  font-size: 1.4rem;
  margin: 0.5rem 0;
  text-align: center;
}

.num::-webkit-outer-spin-button,
.num::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  font-size: 1.2rem;
}
</style>