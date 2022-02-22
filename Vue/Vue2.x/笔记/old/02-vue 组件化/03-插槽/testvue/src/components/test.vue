<template>
  <div class="test">
    <h2>ASHUN</h2>
    <slot><h2>ashun</h2></slot>
    <slot name="testSlot" prop="testProp" Name="shunzi">
      <input type="radio" />
    </slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hobbies: [
          { default: false, content: "篮球" },
          { default: true, content: "唱歌" },
          { default: true, content: "跳舞" },
          { default: true, content: "码字" },
          { default: true, content: "跑酷" },
        ],
        chooses: ["篮球"],
      };
    },
    filters: {
      showhobbies(chooses) {
        return chooses.join(",");
      },
    },
  };
</script>
