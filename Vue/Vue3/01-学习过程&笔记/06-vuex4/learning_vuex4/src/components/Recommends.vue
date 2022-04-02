<template>
  <div id="Recommends-CPN">
    {{ mode }}
    <div class="wrapper">
      <div class="box" v-for="item in recommends" :key="item.image">
        <img :src="item.image" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, defineComponent } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    name: "Recommends-CPN",
    setup() {
      const store = useStore();

      //保证 state、getter 的响应式
      const recommends = computed(() => store.state.recommends);
      const mode = computed(() => store.getters.getMode);

      console.log(recommends, mode);

      return { recommends, mode };
    },
  });
</script>
<style lang="postcss" scoped>
  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .box {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-bottom: 50px;
  }
  .box img {
    width: 50px;
    height: 50px;
  }
</style>
