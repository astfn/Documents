<template>
  <div id="brother" v-show="isShow">
    <h3>{{ title }}</h3>
  </div>
</template>
<script>
  import { defineComponent, computed } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    setup() {
      const title = "我是Brother组件";
      /*
      若纯使用CompositionAPI，完成vuex的状态访问**需要保证其响应式**：
      为了能让template在vuex状态变更时也触发更新(响应式)，
      需要将访问的变量定义为computed
    */
      let isShow = computed(() => useStore().state.isShow);
      //若直接访问，并绑定到视图上，isShow并不具有响应式。
      // let isShow = useStore().state.isShow;
      return {
        title,
        isShow,
      };
    },
  });
</script>
<!-- Vue3 语法向下兼容，可以直接在模板中使用$store访问-->
<!--
<template>

  <div id="brother" v-show="$store.state.isShow">
    <h3>{{title}}</h3>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const title="我是Brother组件";
    return{title}
  },
})
</script>
-->
