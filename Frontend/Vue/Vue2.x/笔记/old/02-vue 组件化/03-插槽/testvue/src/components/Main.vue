<template>
  <div id="main">
    <transition name="fade">
      <h1 v-if="isShow">{{ message }}</h1>
    </transition>
    <button ref="button" type="button" @click="changeShow">
      changeData
    </button>
    <span v-html="htmltext">Ashun</span>
    <!-- 传统方式的slot用法 可绑定在普通标签、template标签 -->
    <test-cpn>
      <!-- 替换具名插槽内容 -->
      <div slot="testSlot" slot-scope="params">
        {{ params.prop }}\{{ params.Name }}
      </div>
      <!-- 匿名插槽会被插入的内容替换 -->
      shun
    </test-cpn>
    <!-- 最新slot用法 v-slot:SlotName="parmas" 只能绑定在template标签上 -->
    <test-cpn>
      <template v-slot:testSlot="params">
        {{ params.prop }}\\\\{{ params.Name }}
      </template>
      shunzia
    </test-cpn>
  </div>
</template>
<script>
  import testCpn from "./test.vue";
  function topTag(msg) {
    console.log(`——————${msg}——————`);
  }
  function endTag(msg, end) {
    console.log(`——————${msg}End—————${end ? end : ""}\n\n\n`);
  }
  export default {
    name: "MainCPN",
    data() {
      return {
        message: "Ashuntefannao",
        isShow: true,
        htmltext: "<h2>SHUN</h2>",
      };
    },
    components: {
      testCpn,
    },
    props: {
      testprop: {
        type: String,
        default: "ashun",
      },
    },
    methods: {
      changeShow() {
        this.isShow = !this.isShow;
        this.changeData();
      },
      method() {
        return "Vue.methods中方法";
      },
      changeData() {
        this.message = "changed message";
      },
    },
    computed: {
      calc() {
        return "Vue.computed中方法";
      },
    },
    beforeCreate() {
      topTag("beforeCreate");

      console.log(" 访问$el:", this.$el);
      console.log(" 访问$data:", this.$data);

      endTag("beforeCreate");
    },
    created() {
      topTag("created");

      console.log(" 访问$el:", this.$el);
      console.log(" 访问data:", Object.keys(this.$data));
      console.log(" 访问data中数据:", this.$data.message);
      console.log(" 访问$props:", this.$props.testprop);
      console.log(" 访问methods:", this.method());
      console.log(" 访问computed:", this.calc);

      endTag("created");
    },
    beforeMount() {
      topTag("beforeMount");
      //挂载前改变数据，不会触发uptate
      console.log("访问$el:", this.$el);
      console.log("访问$refs:", this.$refs["button"]);
      console.log(" 访问data:", Object.keys(this.$data));

      endTag("beforeMount");
    },
    mounted() {
      //由于virtualDom已经挂载到页面，在此改变数据，会触发update
      topTag("mounted");

      console.log("访问$el:", this.$el);
      console.log("访问$refs:", this.$refs["button"]);
      console.log(" 访问data:", Object.keys(this.$data));

      endTag("mounted");
    },
    beforeUpdate() {
      topTag("beforeUpdate");

      //在此改变数据，会再次触发update钩子
      // let message = "beforeUpdate 改变了 this.message";
      // this.message = "beforeUpdate 改变了 this.message";
      // console.log(message);

      endTag("beforeUpdate");
    },
    updated() {
      topTag("updated");
      endTag("updated");
    },
    beforeDestroy() {
      topTag("beforeDestroy");
      endTag("beforeDestroy");
    },
    destroyed() {
      topTag("destroyed");
      endTag("destroyed");
    },
  };
</script>
<style scoped>
  h2 {
    background-color: pink;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
