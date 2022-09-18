<template>
  <component :is="route.params.id=='enemy'?list1:list"></component>
</template>

<script setup lang="ts">
import { role } from '@/store';
import { roles } from '@/server/role';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import list from './list.vue';
import list1 from './list1.vue';
import {scroll} from '@/hooks/scroll';
scroll();
const Role = role();
const route = useRoute();
type types = 'musume' | 'enemy' | 'BeastGod';

onMounted(async () => {
  const id = route.params.id + '' as types;
  if (!Role.rolelist[id]) {
    const result = await roles(id);
    Role.rolelist[id] = result.data.role;
    Role.rolelistde[id] = result.data.roles;
  }
});
</script>