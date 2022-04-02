<template>
  <div id="User-CPN">
    <pre>{{ userInfo }}</pre>
  </div>
</template>

<script>
  import { computed, defineComponent } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    name: "User-CPN",
    setup() {
      const store = useStore();

      //保证 state、getter 的响应式
      const userInfo = computed(() => store.getters.getUserInfo);

      return { userInfo };
    },
  });
</script>
