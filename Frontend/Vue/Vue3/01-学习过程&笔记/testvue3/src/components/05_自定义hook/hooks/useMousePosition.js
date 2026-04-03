import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export default function() {
  const MouseState = reactive({
    x: 0,
    y: 0,
  });
  const clickFunc = (e) => {
    MouseState.x = e.clientX;
    MouseState.y = e.clientY;
    console.log("Ashun");
  };
  onMounted(() => {
    window.addEventListener("click", clickFunc);
  });
  onUnmounted(() => {
    window.removeEventListener("click", clickFunc);
  });
  return {
    //Mouse
    ...toRefs(MouseState),
  };
}
