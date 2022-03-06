<template>
  <main>
    <li>
      <p>ref响应式数据（基本类型）：{{ count }}</p>
      <button @click="increment">increment</button>
    </li>
    <li>
      <p>ref响应式数据（引用类型）：{{ ref_user.name }}--{{ ref_user.age }}</p>
      <button @click="changeUser">changeUser</button>
    </li>
  </main>
</template>
<script>
  //引入ref
  import Vue, { defineComponent, ref } from "vue";

  export default defineComponent({
    setup() {
      //ref引用类型
      const ref_user = ref({
        name: "Ashun",
        age: 18,
      });
      const changeUser = () => {
        ref_user.value.name = "Ashuntefannao";
        ref_user.value.age = 20;
      };

      //ref基本类型
      let count = ref(0);
      const increment = () => {
        count.value++;
      };
      return {
        ref_user,
        changeUser,
        count,
        increment,
      };
    },
  });
</script>
