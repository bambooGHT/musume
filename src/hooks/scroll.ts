import { onBeforeUnmount, onMounted } from "vue";
export let distance = 0;
export function scroll() {
  onMounted(() => {
    document.documentElement.scrollTop = distance;
  });
  onBeforeUnmount(() => {
    distance = document.documentElement.scrollTop;
  });
}
export function devalue() {
  distance = 0;
}