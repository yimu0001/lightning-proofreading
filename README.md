<!--
 * @Author: 易木
 * @Date: 2022-08-23 16:26:54
 * @LastEditors: 易木
 * @LastEditTime: 2022-08-24 14:55:28
 * @FilePath: \lightning-proofreading\README.md
 * @Description: 
 * 
 * Copyright (c) 2022 by 信通, All Rights Reserved. 
-->
# 闪电云-智能校验

### 安装方法
> npm install lightning-proofreading

### 使用方法
> `import LightningProofreading from "lightning-proofreading"`

`<lightning-proofreading ref="lightningProofreading" ></lightning-proofreading>`


## 调用方法
通过ref形式调用

| 方法名 | 参数 | 备注 |
| ------- | ------- |------- |
|  handleTextProofreading |     type,msg     |   type: 1是黑马校验；2海看校验；msg: 文章html   |


## 事件
| 方法名  | 事件 | 返回值 | 备注 |
| ------- |  ------- | ------- |------- |
|  handleReplaceErrorWord |     替换错误值    |  item(主要用于黑马校验)。根据需要处理   | 见备注1 |
|  handleIgnoreErrorWord |     忽略错误值    |  item(主要用于黑马校验)。根据需要处理   | 见备注2 |



## 备注
//替换错误信息
    handleReplaceErrorWord(item) {
      let reg_word =
        '<span[^>]*?class="profreead-item profreead-item-' +
        item.Pos +
        '"[^>]*?>(.*?)<\/span>';
      let reg = new RegExp(reg_word);
      this.$refs.yimuUeditor.msg = this.$refs.yimuUeditor.msg.replace(
        reg,
        item.colItem
      );
    },
    handleIgnoreErrorWord(item) {
      let reg_word =
        '<span[^>]*?class="profreead-item profreead-item-' +
        item.Pos +
        '"[^>]*?>(.*?)<\/span>';
      let reg = new RegExp(reg_word);
      this.$refs.yimuUeditor.msg = this.$refs.yimuUeditor.msg.replace(
        reg,
        "$1"
      );
    },
    
    //退出审校-全部忽略
    handleOutProofread() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确定退出校验?</p>",
        onOk: () => {
          this.$refs.yimuUeditor.msg = this.$refs.yimuUeditor.msg.replace(
            /<span[^>]*?class="profreead-item profreead-item-\d+"[^>]*?>(.*?)<\/span>/gm,
            "$1"
          );
          this.proofreading = false;
          this.asyncProofreadingResInterval &&
            clearInterval(this.asyncProofreadingResInterval);
        }
      });
    },

    //重新校验
    handleRefreshResult() {
      this.$refs.yimuUeditor.msg = this.$refs.yimuUeditor.msg.replace(
        /<span[^>]*?class="profreead-item profreead-item-\d+"[^>]*?>(.*?)<\/span>/gm,
        "$1"
      );
      this.handleTextProofreading(this.textProofreadingType);
    }

