<template>
  <div>
    <h3>{{ title }}</h3>
    <hr />
    <p>父组件传入的props</p>
    <ul>
      <li v-for="val in parent.list" :key="val">{{ val }}</li>
    </ul>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const state = reactive({
        title: "我是child组件",
      });
      console.log(props);
      /*
        由于props是一个Proxy对象，所以不能直接进行解构，
        可以使用toRefs转化后进行逐一解构。
      */
      // let { list } = props;
      let { list } = toRefs(props);

      console.log(list.value);
      const parent = {
        list: list.value,
      };

      return {
        ...toRefs(state),
        parent,
      };
    },
  });
</script>
<style scoped>
  div {
    background: yellowgreen;
  }
</style>
