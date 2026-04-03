<template>
  <div id="Alert">
    <button @click="changeShow">isAlert</button>
    <teleport to="body">
      <div id="AlertMask" v-show="isShow">
        <div class="content">
          <button @click="changeShow">X</button>
          <h2>{{ title }}</h2>
          <p>{{ message }}</p>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    name: "AlertCPN",
    props: {
      message: {
        type: String,
        default: "Message",
      },
    },
    setup(props) {
      const state = reactive({
        title: "Alert组件",
        isShow: false,
      });
      const changeShow = () => {
        state.isShow = !state.isShow;
      };
      return {
        ...toRefs(state),
        changeShow,
      };
    },
  });
</script>
<style scoped>
  #Alert {
    color: white;
  }
  #AlertMask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #9b59b6;
    border-radius: 8px;
    padding: 20px;
  }
</style>
