<!--
 * @Author: 易木
 * @Date: 2022-07-05 09:40:29
 * @LastEditors: 易木
 * @LastEditTime: 2022-08-24 10:45:30
 * @FilePath: \lightning-proofreading\src\components\proofreading-result.vue
 * @Description: 校对的弹窗
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="area-box">
    <Tabs type="card" @on-click="handleClickTab">
      <TabPane label="文字" v-if="resultList.length">
        <div class="area-info">
          <div
            class="area-total"
            :class="activeType == 'total' ? 'area-active' : ''"
            @click.stop="handleChangeActiveType('total')"
          >
            <div>
              <div class="area-total-num">{{ resultList.length }}</div>
              <div class="area-total-tip">全部错误</div>
            </div>
          </div>
          <div
            class="area-record"
            :class="activeType == 'record' ? 'area-active-green' : ''"
            @click="handleChangeActiveType('record')"
            v-if="checkType == 1"
          >
            <div>
              <div class="area-record-num">
                {{ recordList.length }}
              </div>
              <div class="area-record-tip">修改记录</div>
            </div>
          </div>
          <!-- <div
            class="area-record area-active-green"
            @click="handleShowTipModal()"
            v-if="checkType == 2"
          >
            <div>
              <div class="area-record-tip">错误预览</div>
            </div>
          </div> -->
          <div v-if="checkType == 2">
            <Button type="primary" @click="handleShowTipModal()"
              >错误预览</Button
            >
          </div>
        </div>
        <div class="result-list">
          <div
            v-for="(item, index) of showList"
            :key="`result-item-${index}`"
            class="result-item"
          >
            <div
              v-for="(colItem, colIndex) of item.CorWord"
              :key="`result-item-col-${colIndex}`"
              class="result-item-col"
            >
              <div>
                <span class="result-item-col-errword">
                  {{ item.ErrWord }}
                </span>
                <span style="color: #ccc" v-if="colItem">&nbsp;——>&nbsp;</span
                >{{ colItem }}
              </div>
              <div
                class="result-item-col-button"
                v-if="activeType == 'total' && type == 1"
              >
                <a
                  @click="handleReplace(item.ErrWord, item.Pos, colItem, index)"
                  v-if="colItem != '<无建议>'"
                  >替换</a
                >
                &nbsp;
                <a @click="handleIgnore(item.ErrWord, item.Pos, index)">忽略</a>
              </div>
            </div>
            <div class="result-item-type" v-if="item.level">
              错误类型:
              <span v-if="item.level == 1">错误</span>
              <span v-else-if="item.level == 2">疑似错误</span>
              <span v-else-if="item.level == 3">严重错误</span>
            </div>
            <div class="result-item-type" v-if="item.reason">
              错误类型:
              <span>{{ item.reason }}</span>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="图片" v-if="imageResultList.length">
        <div class="area-info">
          <div
            class="area-total"
            :class="activeType == 'total' ? 'area-active' : ''"
          >
            <div>
              <div class="area-total-num">{{ imageResultList.length }}</div>
              <div class="area-total-tip">全部错误</div>
            </div>
          </div>
        </div>
        <div class="result-list">
          <div
            v-for="(item, index) of imageResultList"
            :key="`result-item-${index}`"
            class="result-item"
          >
            <div class="result-item-image">
              <img :src="item.image_url" />
            </div>
            <div
              v-for="(reasonItem, reasonIndex) of item.reasons"
              :key="`reason-item-${reasonIndex}`"
              class="reason-item"
            >
              <div class="result-item-type" v-if="reasonItem.reason_type">
                错误类型:
                <span>{{ reasonItem.reason_type }}</span>
              </div>
              <div class="result-item-type" v-if="reasonItem.reason">
                错误原因:
                <span>{{ reasonItem.reason }}</span>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="视频" v-if="videoResultList.length">
        <div class="area-info">
          <div
            class="area-total"
            :class="activeType == 'total' ? 'area-active' : ''"
          >
            <div>
              <div class="area-total-num">{{ videoResultList.length }}</div>
              <div class="area-total-tip">全部错误</div>
            </div>
          </div>
        </div>
        <div class="result-list">
          <div
            v-for="(item, index) of videoResultList"
            :key="`result-item-${index}`"
            class="result-item"
          >
            <div class="result-item-video">
              <video :src="item.video_url" controls></video>
            </div>
            <div
              v-for="(errorImageItem, errorImageIndex) of item.images"
              :key="`error-image-item-${errorImageIndex}`"
            >
              <div class="result-item-image">
                <img :src="errorImageItem.image_url" alt="" />
              </div>
              <div class="result-item-type">
                错误时段:
                <span>{{ errorImageItem.image_time }}</span>
              </div>
              <div
                v-for="(reasonItem, reasonIndex) of errorImageItem.reasons"
                :key="`reason-item-${reasonIndex}`"
              >
                <Row>
                  <Col span="12">
                    <div class="result-item-type" v-if="reasonItem.reason_type">
                      错误类型:
                      <span>{{ reasonItem.reason_type }}</span>
                    </div>
                  </Col>
                  <Col span="12">
                    <div class="result-item-type" v-if="reasonItem.reason">
                      错误原因:
                      <span>{{ reasonItem.reason }}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <div
      v-if="
        !resultList.length && !imageResultList.length && !videoResultList.length
      "
      class="noDataDom"
    >
      <img src="../assets/noData.png" class="noDataImage" />
      <div class="noDataWord">无校验结果~</div>
    </div>
    <proofread-result-tip-content-modal
      ref="proofreadResultTipContentModal"
    ></proofread-result-tip-content-modal>
  </div>
</template>

<script>
import ProofreadResultTipContentModal from "./proofread-result-tip-content-modal.vue";
import { Tabs, TabPane, Row, Col, Dropdown, Button } from "view-design";
export default {
  name: "ProofreadResultList",
  components: {
    ProofreadResultTipContentModal,
    Tabs,
    TabPane,
    Row,
    Col,
    Dropdown,
    Button,
  },
  props: {
    result: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Number || String,
      default: 1,
    },
    imageResult: {
      type: Array,
      default: () => [],
    },
    videoResult: {
      type: Array,
      default: () => [],
    },
    tipContent: {
      type: String,
      default: () => "",
    },
  },
  watch: {
    result(newValue, oldValue) {
      this.resultList = newValue.concat();
      this.recordList = [];
    },
    imageResult(newValue) {
      this.imageResultList = newValue.concat();
    },
    videoResult(newValue) {
      this.videoResultList = newValue.concat();
    },
    type(newValue) {
      this.checkType = newValue;
    },
    tipContent(newValue) {
      this.newTipContent = newValue;
    },
  },
  computed: {
    showList() {
      let arr = [];
      if (this.activeType == "total") {
        arr = this.resultList;
      } else {
        arr = this.recordList;
      }
      return arr;
    },
  },
  data() {
    return {
      recordList: [],
      resultList: this.result,
      activeType: "total",
      checkType: this.type,
      imageResultList: this.imageResult,
      videoResultList: this.videoResult,
      newTipContent: this.tipContent,
    };
  },
  methods: {
    handleReplace(ErrWord, Pos, colItem, index) {
      let row = { ErrWord, Pos, colItem };
      this.$emit("handleReplaceErrorWord", row);
      this.resultList.splice(index, 1);
      this.recordList.push({ ErrWord, Pos, CorWord: [colItem], index });
    },
    handleIgnore(ErrWord, Pos, index) {
      let row = { ErrWord, Pos };
      this.$emit("handleIgnoreErrorWord", row);
      this.resultList.splice(index, 1);
    },
    //切换展示类型-是错误还是修改记录
    handleChangeActiveType(type) {
      this.activeType = type;
    },
    //点击tab, 将活跃节点改
    handleClickTab() {
      this.activeType = "total";
    },
    //打开文字标注弹窗
    handleShowTipModal() {
      this.$refs.proofreadResultTipContentModal.changeVisible(
        this.newTipContent
      );
    },
  },
};
</script>

<style lang="less" scoped>
.area-box {
  height: 100%;
  background-color: #e9e8e863;
  min-height: 760px;
  padding: 20px;
  margin-top: 20px;
  .area-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .area-title {
      font-weight: bold;
    }
    .area-refresh {
      color: #999;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .area-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .area-total,
    .area-record {
      width: 100px;
      height: 60px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 8px;
      .area-total-num {
        color: red;
        font-weight: bold;
        font-size: 18px;
      }
      .area-record-num {
        font-weight: bold;
        font-size: 18px;
        color: #19be6b;
      }
    }
    .area-active {
      background-color: #f7dddd;
    }
    .area-active-green {
      background-color: #81dfb05e;
    }
  }
  .result-list {
    .result-item {
      border-radius: 5px;
      // border: 1px solid #999;
      margin-bottom: 10px;
      padding: 10px;
      background-color: #fff;
      .result-item-col {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        &:last-child {
          margin-bottom: 0;
        }
        .result-item-col-errword {
          color: red;
        }
      }
      .result-item-type {
        margin-top: 10px;
        color: #999;
        font-size: 12px;
      }
      .result-item-image {
        text-align: center;
        img {
          max-width: 60%;
          max-height: 140px;
        }
      }
      .result-item-video {
        text-align: center;
        margin-bottom: 20px;
        video {
          max-width: 80%;
          max-height: 200px;
        }
      }
      .reason-item {
        margin-bottom: 12px;
      }
    }
  }
}
.noDataDom {
  text-align: center;
  padding: 60px 0;
}
.noDataImage {
  width: 50%;
}
.noDataWord {
  margin-top: 10px;
  color: #4381ff;
  font-size: 18px;
}
</style>
