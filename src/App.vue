<!--
 * @Descripttion: 
 * @Author: zhuaoqi
 * @Date: 2022-09-10 18:33:52
 * @LastEditors: zhuaoqi
 * @LastEditTime: 2022-09-11 02:22:35
-->
<template>
  <el-row :gutter="20" justify="space-between">
    <el-col :span="12" style="text-align: center">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix">
            <span>门店编号对应表</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="toBeSentList.length = 0"
              >清空</el-button
            >
          </div>
        </template>

        <el-upload
          v-if="toBeSentList.length === 0"
          class="upload-demo"
          action="/"
          drag
          :auto-upload="false"
          :show-file-list="false"
          accept=".xlsx,.xls"
          :on-change="handleChange"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将 .xlsx、.xls文件拖到此处 <br /><em>点击上传（单选）</em>
          </div>
          <!-- input 上传 xlsx-->
        </el-upload>
        <template v-if="toBeSentList && toBeSentList.length">
          <el-table
            :data="
              toBeSentList.slice(
                (currentPage1 - 1) * pageSize1,
                pageSize1 * currentPage1
              )
            "
            show-summary
            style="width: 100%"
            height="470px"
          >
            <el-table-column
              width="80"
              prop="标题"
              label="标题"
            ></el-table-column>
            <el-table-column
              width="120"
              prop="账套客户名称"
              label="账套客户名称"
            ></el-table-column>
            <el-table-column
              width="120"
              prop="账套客户编码"
              label="账套客户编码"
            >
            </el-table-column>
            <el-table-column
              width="80"
              prop="邮件内容"
              label="邮件内容"
            ></el-table-column>
            <el-table-column width="180" fixed="right" prop="邮箱" label="邮箱">
            </el-table-column>
          </el-table>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <el-pagination
              v-model:currentPage="currentPage1"
              v-model:page-size="pageSize1"
              :page-sizes="[10, 50, 100]"
              background
              layout="total, sizes, prev, pager, next"
              :total="currentTota1"
            />
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="12" style="text-align: center">
      <el-card>
        <template #header>
          <div class="clearfix">
            <span>附件列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="
                fileLists.length = 0;
                upload.clearFiles();
              "
              >清空</el-button
            >
          </div>
        </template>
        <el-upload
          class="upload-demo"
          action="/"
          drag
          ref="upload"
          multiple
          :auto-upload="false"
          :show-file-list="false"
          accept=".xlsx,.xls.pdf,.doc,.docx,.XLSX,.XLS,.PDF,.DOC,.DOCX,.Xlsx,.Doc,.Docx"
          :on-change="handleChangeFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将列表文件文件拖到此处，或 <br /><em>点击上传（多选）</em>
          </div>
          <!-- input 上传 xlsx-->
        </el-upload>
        <template v-if="fileLists && fileLists.length">
          <el-table
            :data="
              fileLists.slice(
                (currentPage2 - 1) * pageSize2,
                pageSize2 * currentPage2
              )
            "
            height="350px"
          >
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column
              width="80"
              prop="size"
              label="大小"
            ></el-table-column>
            <el-table-column
              width="120"
              show-overflow-tooltip
              prop="raw.type"
              label="类型"
            >
            </el-table-column>
            <el-table-column
              width="80"
              prop="status"
              label="状态"
            ></el-table-column>
          </el-table>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <el-pagination
              v-model:currentPage="currentPage2"
              v-model:page-size="pageSize2"
              :page-sizes="[10, 50, 100]"
              background
              layout="total, sizes, prev, pager, next"
              :total="currentTota2"
            />
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
  <div style="margin: 20px; text-align: center">
    <el-button type="primary" :loading="ElLoading_" @click="sedEmilDiaog"
      >发送邮件</el-button
    >
    <!-- <el-button type="primary" @click="sendEmail">发送</el-button> -->
  </div>

  <el-dialog
    title="确认发送信息"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    top="5vh"
    width="76%"
    :beforeClose="
      () => () => {
        Boolean(allSendStatus != 1) ? (dialogVisible = false) : '';
      }
    "
  >
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="发件邮箱：">
          <el-input
            style="font-size: 16px; font-weight: bold"
            placeholder="请输入163邮箱"
            spellcheck="false"
            v-model="from.username"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="服务密码：">
          <el-input
            type="password"
            placeholder="请输入服务密码"
            spellcheck="false"
            v-model="from.paddword"
            show-password
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="邮件服务器：">
          <el-select v-model="from.host" placeholder="请选择">
            <el-option
              v-for="item in serverList"
              :key="item.value"
              :label="item.label + ':' + item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-table :data="beffofileList" style="width: 100%" height="400px">
      <el-table-column
        width="100"
        prop="标题"
        label="门店名称"
      ></el-table-column>
      <el-table-column width="180" label="邮箱">
        <template #default="scope">
          <a :href="'mailto:' + scope.row['邮箱']">{{ scope.row["邮箱"] }}</a
          ><br />
          <span
            v-if="scope.row['抄送邮箱']"
            style="font-size: 12px; color: #666"
          >
            抄送:<a :href="'mailto:' + scope.row['抄送邮箱']">{{
              scope.row["抄送邮箱"]
            }}</a>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        prop="账套客户编码"
        label="账套客户编码"
      ></el-table-column>
      <el-table-column width="180" label="附件">
        <template #default="scope">
          <em v-if="scope.row.file" style="color: #409eff">{{
            scope.row.file.name
          }}</em>
          <span v-else>无附件</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="账套客户名称" label="账套客户名称">
      </el-table-column>

      <el-table-column width="80" prop="" label="邮件内容">
        <template #default> 空 </template>
      </el-table-column>

      <el-table-column label="发送状态" width="180" fixed="right">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span v-if="scope.row.sendStatus === -1">等待中...</span>
            <el-icon
              v-if="scope.row.sendStatus == 0"
              class="is-loading"
              :size="20"
              ><Loading
            /></el-icon>
            <el-icon v-if="scope.row.sendStatus == 1" :size="20" color="green"
              ><SuccessFilled
            /></el-icon>
            <el-icon v-if="scope.row.sendStatus == 2" :size="20" color="red"
              ><CircleCloseFilled
            /></el-icon>
            <span v-if="scope.row.sendStatus === 2">{{
              scope.row.sendErrStatus
            }}</span>
          </div>
          <!-- <el-tag v-else type="danger">发送失败</el-tag> -->
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      total：{{ beffofileList.length }}
      <span
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button
          @click="
            () => {
              Boolean(allSendStatus != 1) ? (dialogVisible = false) : '';
            }
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          :loading="allSendStatus == 1"
          @click="sendEmail"
          >确定发送</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, h, onMounted, nextTick } from "vue";
import { read, utils } from "xlsx";
const nodemailer = require("nodemailer");

import {
  SuccessFilled,
  Loading,
  CircleCloseFilled,
} from "@element-plus/icons-vue";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  name: "App",
  components: {
    SuccessFilled,
    Loading,
    CircleCloseFilled,
  },
  setup() {
    const currentPage1 = ref(1);
    const currentPage2 = ref(1);
    const pageSize1 = ref(10);
    const pageSize2 = ref(10);
    const currentTota1 = ref(0);
    const currentTota2 = ref(0);
    var allSendStatus = ref(0);
    var ElLoading_ = ref(false);
    // 成功发送的数量
    var successSendNum = ref(0);
    const upload = ref();
    var serverList = reactive([
      {
        value: "smtp.qq.com",
        label: "QQ邮箱",
      },
      {
        value: "smtp.163.com",
        label: "网易邮箱",
      },
      {
        value: "smtp.sina.com",
        label: "新浪邮箱",
      },
      {
        value: "smtp.126.com",
        label: "126邮箱",
      },
      {
        value: "smtp.139.com",
        label: "139邮箱",
      },
      {
        value: "smtp.gmail.com",
        label: "Gmail邮箱",
      },
    ]);
    // 失败发送的数量
    var failSendNum = ref(0);
    var fileLists: any = reactive([]);
    var toBeSentList: any = reactive([]);
    var beffofileList: any = reactive([]);
    var total = ref(100);
    var currentPage = ref(1);
    var pageSize = ref(10);
    var dialogVisible = ref(false);
    var from = reactive({
      username: "",
      paddword: "",
      host: "smtp.163.com",
      port: 465,
      secure: true,
    });
    onMounted(() => {
      // 读取本地存储
      console.log(window);
      setTimeout(() => {
        window.ClosePreloadLoading();
      }, 300);
    });
    const handleChange = (file: any, fileList: any) => {
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target && ev.target.result;
          const workbook = read(data, {
            type: "binary",
            cellDates: true,
          });
          const wsname = workbook.SheetNames[0]; // 取第一张表
          const ws = utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
          toBeSentList.length = 0;
          toBeSentList.push(...ws);
          console.log(ws);
          currentTota1.value = ws.length;
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(file.raw);
    };

    const handleChangeFile = (file: any, fileList: any) => {
      try {
        fileLists.length = 0;
        fileLists.push(...fileList);
        currentTota2.value = fileList.length;
        console.log(fileLists);
      } catch (e) {
        return false;
      }
    };

    const sedEmilDiaog = () => {
      beffofileList.length = 0;
      ElLoading_.value = true;
      setTimeout(() => {
        toBeSentList.forEach((item: any) => {
          // 匹配到的文件
          const file = fileLists.find((file: any) => {
            return file.name.split("_")[0] === item["账套客户编码"];
          });
          beffofileList.push({
            ...item,
            // 发送状态
            sendStatus: -1,
            sendErrStatus: "",

            file: file,
          });
        });
        dialogVisible.value = true;
        ElLoading_.value = false;
      }, 10);
    };
    var send = (transporter: any, item: any) => {
      return new Promise((resolve, reject) => {
        fileLists[0].raw.arrayBuffer().then((arrayBuffer: any) => {
          transporter
            .sendMail({
              from: from.username,
              to: item["邮箱"],
              cc: item["抄送邮箱"] ? item["抄送邮箱"].split(";") : [],
              subject: item.file.name ? item.file.name.split(".")[0] : "对账单",
              text: item.file.name ? item.file.name.split(".")[0] : "对账单",
              attachments: [
                {
                  filename: fileLists[0].name,
                  content: Buffer.from(arrayBuffer),
                },
              ],
            })
            .then((res: any) => {
              resolve(res);
              successSendNum.value++;
              item.sendStatus = 1;
              console.log(res);
            })
            .catch((err: any) => {
              item.sendStatus = 2;
              failSendNum.value++;
              item.sendErrStatus = err;
              resolve(err);
              console.log(err);
            });
        });
      });
    };
    // 发送邮件
    const sendEmail = async () => {
      if (toBeSentList.length === 0) {
        ElMessage.error("请先上传待发送的文件");
        return;
      }
      // 发送状态
      allSendStatus.value = 1;
      successSendNum.value = 0;
      failSendNum.value = 0;
      // 创建发送对象
      var transporter = nodemailer.createTransport({
        host: from.host,
        port: from.port,
        secure: from.secure,
        auth: {
          user: from.username,
          pass: from.paddword,
        },
      });

      // 发送邮件

      for (let i = 0; i < beffofileList.length; i++) {
        const item = beffofileList[i];
        if (item.sendStatus === 1) {
          alert("已经发送成功");
          continue;
        } else if (item["邮箱"] && item.file) {
          item.sendStatus = 0;
          await send(transporter, item);
        } else {
          item.sendStatus = 2;
          failSendNum.value++;

          item.sendErrStatus = "邮箱或文件不存在";
        }
      }

      allSendStatus.value = 2;

      console.log(beffofileList);
      ElMessageBox({
        title: "发送完成",
        message: h("p", null, [
          h("span", null, "成功发送："),
          h("i", { style: "color: green" }, successSendNum.value + "条"),
          h("br"),
          h("span", null, "失败发送："),
          h("i", { style: "color: red" }, failSendNum.value + "条"),
        ]),
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((action) => {
        // 数组排序 成功在前 失败在后
        beffofileList.sort((a: any, b: any) => {
          return a.sendStatus - b.sendStatus;
        });
      });
    };

    return {
      currentPage1,
      currentPage2,
      pageSize1,
      pageSize2,
      currentTota1,
      currentTota2,
      fileLists,
      toBeSentList,
      beffofileList,
      total,
      currentPage,
      pageSize,
      dialogVisible,
      from,
      allSendStatus,
      serverList,
      ElLoading_,
      upload,
      handleChange,
      handleChangeFile,
      sedEmilDiaog,
      sendEmail,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding: 10px;
}
.el-input--large .el-input__wrapper {
  padding: 1px 8px !important;
}
* {
  margin: 0;
  text-align: left;
}
</style>
