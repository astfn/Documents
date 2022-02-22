import { ref, computed } from "vue";
export default function() {
  const counter = ref(1);
  const increment = () => {
    counter.value++;
  };
  const decrement = () => {
    counter.value -= counter.value > 1 ? 1 : 0;
  };
  const isDisabled = computed(() => {
    return counter.value <= 1;
  });

  return {
    counter,
    increment,
    decrement,
    isDisabled,
  };
}
