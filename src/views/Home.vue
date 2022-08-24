<!--
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2022-08-23 17:42:28
 * @LastEditors: 易木
 * @Description: In User Settings Edit
 * @FilePath: \lightning-proofreading\src\views\Home.vue
-->
<template>
  <div style="width: 30%">
    <proofreading-dom ref="proofreadingDom"></proofreading-dom>
    <div>
      <textarea id="msgArea"></textarea>
    </div>
    <div @click="handleTest">点击测试</div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProofreadingDom from "@/components/proofreading-dom.vue";
export default {
  name: "Home",
  components: {
    ProofreadingDom,
  },
  methods: {
    handleTest() {
      let msg = document.getElementById("msgArea").value;
      console.log(msg);
      this.$refs.proofreadingDom.handleTextProofreading(2, msg);
    },
  },
};
</script>
