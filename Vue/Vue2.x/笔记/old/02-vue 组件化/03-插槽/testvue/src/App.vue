<template>
  <div id="app">
    <main-cpn testprop="App 传入的prop" />
  </div>
</template>

<script>
  import MainCpn from "@/components/Main.vue";

  export default {
    name: "App",
    components: {
      MainCpn,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
