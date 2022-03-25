<template>
  <div id="Grandson">
    <h2>{{ title }}</h2>
    <teleport to="body">
      <alert :message="message" />
    </teleport>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import Alert from "./Alert.vue";
  export default defineComponent({
    name: "GrandsonCPN",
    components: { Alert },
    setup() {
      const state = reactive({
        title: "Grandson组件",
        message: "父组件传入的massage",
      });

      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style scoped>
  #Grandson {
    margin: 8px;
    color: white;
    background: #e74c3c;
    position: relative;
    overflow: hidden;
  }
</style>
