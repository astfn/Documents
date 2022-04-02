<template>
  <header><strong>ToDoList</strong></header>
  <main>
    <input id="addBar" type="text" v-model="state.content" />
    <button @click="addTodo">添加todo</button>
    <ul>
      <li v-for="(val, index) in state.todoList" key="val">
        <div class="content">{{ index }}--{{ val }}</div>
        <button @click="deleteTodo(index, val)">delete</button>
      </li>
    </ul>
  </main>
</template>
<script>
  /*
      reactive小总结：
      1. 用于定义**引用类型**的响应式数据
      2. 一定要将定义的state在setup方法中返回出去，才能够在template中访问
         事件处理函数同理，只要与view相结合的状态，都要进行return。
      3. 在template中，通过暴露出去的变量名称访问状态，例如下面代码中定义的是state
         就要通过`state.prop`进行访问
  */
  //Vue将各个功能模块进行了抽离
  import Vue, { defineComponent, reactive } from "vue";

  export default defineComponent({
    setup() {
      const state = reactive({
        content: "",
        todoList: [],
      });
      const addTodo = () => {
        if (state.content) {
          //Vue3能够直接通过索引改变数组实现响应式，因为内部使用Proxy进行拦截
          state.todoList[state.todoList.length] = state.content;
          state.content = "";
        } else {
          alert("不能为空");
        }
      };
      const deleteTodo = (index, val) => {
        state.todoList.splice(index, 1);
        alert(`您删除了：${val}`);
      };
      return {
        state,
        addTodo,
        deleteTodo,
      };
    },
  });
</script>
