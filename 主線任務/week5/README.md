第五週 - 進階語法介紹
===

# 作業資源：

## 主線任務

- 使用 [VeeValidate 套件](https://vee-validate.logaretm.com/v4/)完成表單驗證功能，[操作文件](https://hackmd.io/FFv0a5cBToOATP7uI5COMQ)（無ESM 版本）
- 使用 [loading 套件](https://www.npmjs.com/package/vue-loading-overlay)製作 loading 效果
- 串接前台 API 完成購物車功能

注意：

- 新增相同產品到購物車時需累加項目
- 送出訂單後，購物車需要清除原本項目
- 購物車無產品時不建議發出結帳請求

前台頁面表單驗證（必要完成），驗證內容包含：

- 姓名：必填
- Email：必填 / 需要符合格式 / input type 為 email
- 電話：必填 / 超過 8 碼 / input type 為 tel
- 地址：必填
- 留言：非必填



### 課程 API 相關網址：

- [註冊連結、測試管理平台](https://vue3-course-api.hexschool.io/)
- [API 文件](https://hexschool.github.io/vue3-courses-swaggerDoc/#/)

前台購物流程 API：

- [頁面模板](https://codepen.io/hexschool/pen/NWpBXZy)
- [產品列表](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%94%A2%E5%93%81%20(Products)/get_v2_api__api_path__products)
- [單一產品細節](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%94%A2%E5%93%81%20(Products)/get_v2_api__api_path__product__id_)
- [加入購物車](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/post_v2_api__api_path__cart)
- [購物車列表](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/get_v2_api__api_path__cart)
- 刪除購物車項目（[單一](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/delete_v2_api__api_path__cart__id_)、[全部](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/delete_v2_api__api_path__carts)）
- [調整購物車產品數量](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/put_v2_api__api_path__cart__id_)
- [結帳付款](https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%B5%90%E5%B8%B3%20(Order)/post_v2_api__api_path__order)

***

作業須符合此[作業規範](https://hackmd.io/XbKPYiE9Ru6G0sAfB5PBJw)

### 繳交內容

1. 您的 Discord 名稱
1. 您的作業等級，請見下方等級表，例如 LV1
1. 作業網址：請提供 GitHub Repo 以及 GitHub Pages 連結，以方便助教與講師檢視

### 作業等級表
1. LV1：參考範例程式碼，完成表單驗證功能
1. LV2：完成表單驗證，以及串接 API 功能
1. LV3：自行設計前台頁面以及完成以上功能

### 作業地雷
- GitHub Pages 需正常開啟
- 提問超過 2 個問題批改時間會延長


每週的範例 github-pages：https://hexschool.github.io/live-vue3-training-chapter-works/

GitHub Repo：https://github.com/hexschool/live-vue3-training-chapter-works

⭐️ 範例檔案中的 API Path 請換成自己的唷！

（[範例使用教學](https://hackmd.io/1OSNS4AtRQ2-j-WrbrOgyg)）