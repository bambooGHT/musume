<template>
  <div class="roleinfo">
    <spine />
    <Info />
    <div class="roleinfo1">
      <Attri />
    </div>
  </div>
</template>

<script setup lang="ts">
import Spine from './Spine.vue';
import Info from './Info.vue';
import Attri from './Attri.vue';

</script>

<style lang="scss" scoped>
.roleinfo {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-top: 0.5rem;
  padding: 0 1rem 1rem;
  max-width: 100%;

  @media screen and (max-width:666px) {
    padding: 0;
  }

  &1 {
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;

    @media screen and (min-width:1120px) {
      display: none;
    }

    @media screen and (max-width:666px) {
      width: 97vw;
    }
  }
}
</style>