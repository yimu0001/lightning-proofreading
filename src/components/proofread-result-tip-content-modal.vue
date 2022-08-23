<!--
 * @Author: 易木
 * @Date: 2022-08-23 14:24:22
 * @LastEditors: 易木
 * @LastEditTime: 2022-08-23 14:52:40
 * @FilePath: \lightning-proofreading\src\components\proofread-result-tip-content-modal.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 信通, All Rights Reserved. 
-->
<template>
  <div>
    <Modal
      v-model="modalVisible"
      title="错误预览"
      width="900"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="showDom">
        <div v-html="content" class="content"></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal } from "view-design";
export default {
  name: "ProofreadResultTipContentModal",
  components: {
    Modal,
  },
  data() {
    return {
      modalVisible: false,
      content: "",
    };
  },
  methods: {
    changeVisible(content) {
      this.content = content;
      this.modalVisible = true;
    },
    ok() {},
    cancel() {},
  },
};
</script>

<style lang="less" scoped>
.showDom {
  .content {
    max-height: 700px;
    overflow-y: auto;
    /deep/ p {
      min-height: 24px;
    }
    /deep/ img {
      max-width: 100% !important;
    }
    /deep/ video {
      max-width: 100% !important;
      max-height: 600px !important;
    }
    /deep/ audio {
      max-width: 100% !important;
    }
    .ql-align-center {
      text-align: center;
    }
  }
}
</style>
