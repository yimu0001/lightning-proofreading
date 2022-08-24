<template>
  <div>
    <proofreading-result
      ref="proofreadingResult"
      :result="proofreadResult"
      :imageResult="proofreadImgResult"
      :videoResult="proofreadVideoResult"
      @handleReplaceErrorWord="handleReplaceErrorWord"
      @handleIgnoreErrorWord="handleIgnoreErrorWord"
      :type="textProofreadingType"
    ></proofreading-result>
  </div>
</template>

<script>
import ProofreadingResult from "./proofreading-result.vue";
import { proofreadingText, asyncProofreadingRes } from "@/api/data";
import "view-design/dist/styles/iview.css";
import { Message } from "view-design";
export default {
  name: "ProofreadingDom",
  components: {
    ProofreadingResult,
  },
  data() {
    return {
      proofreadResult: [], //校验文字结果
      proofreadImgResult: [], //校验图片结果
      proofreadVideoResult: [], //校验视频结果
      textProofreadingType: 1, //文字校验类型
      asyncProofreadingResId: undefined, //异步校验结果的pid
      asyncProofreadingResInterval: undefined, //异步查询结果的轮询器
      proofreadLoading: undefined, //异步校验模态框
    };
  },
  methods: {
    //文字审校
    handleTextProofreading(type, msg) {
      this.textProofreadingType = type;
      if (msg == "") {
        Message.error("无内容，请先填写");
        return;
      }
      this.proofreadLoading = Message.loading({
        content: "文字校验中请稍后...",
        duration: 0,
      });
      proofreadingText(type, msg, 1)
        .then((res) => {
          if (res.data.success) {
            // this.proofreadResult = res.data.data.CheckResultList || []
            // this.dealProfreeadingResult()
            this.asyncProofreadingResId = res.data.data.PID;
            this.asyncProofreadingResInterval = setInterval(() => {
              this.getAsyncProofreadingResult(type);
            }, 1000);
          } else {
            Message.error(res.data.message);
            this.proofreadLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          this.proofreadLoading();
        })
        .finally(() => {});
    },
    //异步获取校验结果
    getAsyncProofreadingResult(type) {
      asyncProofreadingRes(type, this.asyncProofreadingResId)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.progressStatus == 1) {
              if (type == 1) {
                this.proofreadResult = res.data.data.CheckResultList || [];
              } else {
                this.proofreadResult = res.data.data.result.words.map(
                  (item) => {
                    let args = {
                      ErrWord: item.word,
                      CorWord: [""],
                      reason: item.reason,
                      Pos: item.positions[0].start,
                    };
                    return args;
                  }
                );
                this.proofreadImgResult = res.data.data.result.images;
                this.proofreadVideoResult = res.data.data.result.videos;
              }
              this.dealProfreeadingResult();
              this.proofreadLoading();
              clearInterval(this.asyncProofreadingResInterval);
              this.asyncProofreadingResId = undefined;
              // this.proofreading = true;
              this.$emit("proofreadEnd");
            }
          } else {
            Message.error(res.data.message);
            this.proofreadLoading();
            clearInterval(this.asyncProofreadingResInterval);
            this.asyncProofreadingResId = undefined;
          }
        })
        .catch((err) => {
          console.log("文字校验错误", err);
          this.proofreadLoading();
          clearInterval(this.asyncProofreadingResInterval);
          this.asyncProofreadingResId = undefined;
        });
    },
    //处理校验结果
    dealProfreeadingResult() {
      let msg = this.$refs.yimuUeditor.msg;
      let word_list = [];
      let proofreadResult = this.proofreadResult.concat();
      proofreadResult.reverse();
      proofreadResult.forEach((item, index) => {
        let start_order = item.Pos;
        let end_order = item.Pos + item.ErrWord.length;
        let start_msg = msg.substring(0, start_order);
        let end_msg = msg.substr(end_order);
        let edit_msg = `<span class='profreead-item profreead-item-${item.Pos}'>${item.ErrWord}</span>`;
        word_list.push(end_msg);
        word_list.push(edit_msg);
        msg = start_msg;
        if (index + 1 == proofreadResult.length) {
          word_list.push(start_msg);
        }
      });
      let word = "";
      word_list = word_list.reverse();
      if (!word_list.length) {
        word = this.$refs.yimuUeditor.msg;
      }
      word_list.forEach((item) => {
        word += item;
      });
      this.$refs.yimuUeditor.msg = word;
    },
    //替换错误信息
    handleReplaceErrorWord(item) {
      this.$emit("handleReplaceErrorWord", item);
    },
    handleIgnoreErrorWord(item) {
      this.$emit("handleReplaceErrorWord", item);
    },
  },
};
</script>

<style lang="less" scoped></style>
