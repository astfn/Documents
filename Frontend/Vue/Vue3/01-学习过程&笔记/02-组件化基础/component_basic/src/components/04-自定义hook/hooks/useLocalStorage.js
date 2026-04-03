import { ref, watch } from "vue";

export default function useLocalStorage(name, callback) {
  let item = JSON.parse(localStorage.getItem(name));
  let state = ref(item);

  let setState = (item) => {
    state.value = item;
    localStorage.setItem(name, JSON.stringify(item));
  };

  let clearState = () => {
    localStorage.removeItem(name);
    state.value = null;
  };

  watch(state, callback);

  return [state, setState, clearState];
}
