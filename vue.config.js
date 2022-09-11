/*
 * @Descripttion:
 * @Author: zhuaoqi
 * @Date: 2022-09-10 22:17:45
 * @LastEditors: zhuaoqi
 * @LastEditTime: 2022-09-11 12:51:09
 */
module.exports = {
  publicPath: "./",
  configureWebpack: {
    target: "node-webkit",
  },
  // 应用程序图标
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.zhuaoqi.app",
        productName: "email_excel", // 项目名，也是生成的安装文件名，即aDemo.exe
        win: {
          // win相关配置
          icon: "./public/favicon.ico", // 图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", // 利用nsis制作安装程序
              arch: ["x64"], // 64位和32位都打包
            },
          ],
        },
        nsis: {
          oneClick: false, // 是否一键安装\
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "./public/favicon.ico", // 安装图标
          uninstallerIcon: "./public/favicon.ico", // 卸载图标
          installerHeaderIcon: "./public/favicon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "对账单邮件发送器", // 图标名称
        },
      },
    },
  },
};
