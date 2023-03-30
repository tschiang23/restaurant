# 餐廳清單 2.0

此專案提供使用者新增、修改、查詢、刪除餐廳的資訊，例如:餐廳類別、地址、評分、描述等

### 功能列表

- 使用者可以註冊帳號建立個人的餐廳
- 支援 Facebook，Google 登入
- 依照餐廳名稱及餐廳類別搜尋
- 依照評分、餐廳名稱 排序餐廳
- 檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
  - 點選 `Back` 返回首頁瀏覽全部餐廳資料
  - 點選 `Edit` 編輯此筆餐廳資料
  - 點選 Google Map 顯示詳細地圖可查看位置詳細資料
- 點選 `新增餐廳` 包含圖片(URL)、評分、類別、地址等資訊，Google Map
- 點選 `Edit` 可編輯此餐廳資料
- 點選 `Delete` 可刪除此餐廳資料

### 環境建置與需求

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [MongoDB](https://www.mongodb.com/) - 資料庫
- [Mongoose](https://www.npmjs.com/package/mongoose) - MongoDB 的 ODM 可以在程式中與資料庫溝通

### 安裝

1. 打開你的 terminal，Clone 此專案至本機電腦

   ```
   git clone https://github.com/koheavens/restaurant.git
   ```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

   ```
   cd restaurant
   ```

3. 安裝 npm 套件

   ```
   在Terminal 輸入 npm install 指令
   ```

4. 產生預設使用者及餐廳資料至 MongoDB

   ```
   npm run seed  //執行增加資料至 MongoDB
   ```

   終端顯示 done 即完成新增資料

   ```
   Ctrl+C *2  //連按兩下Ctrl+C結束批次工作
   ```

5. 在 Terminal 輸入

   ```
   npm run start  //執行程式
   ```

6. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

   ```
   Server is running on http://localhost:3000
   mongoDB connected
   ```
