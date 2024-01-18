// 每日一狗圖．Callback 版
// 載入專案模組
const express = require("express") // 載入express伺服器框架
const app = express() // 載入express伺服器框架
const axios = require("axios") // 載入 axios 工具


// 建立名為 requestData 的物件實例
// 相當於把 axios 這個 Promise 工具, 包裝進自己新建立的 Promise 工具
let requestData = new Promise((resolve, reject) => {
  // 相當於 setTimeout(() => { ... }, 0)
  axios.get('https://webdev.alphacamp.io/api/dogs/random')
  .then( res =>{
    console.log("連線取得資料", res.data)
    resolve(res.data.message) // Promise 成功狀態: 傳出資料
  })
  .catch( error => {
    console.warn(error)
    return reject(error) // Promise 異常狀態: 傳出資料
  })
})

// 使用物件實例得到回傳的 resolve, 並傳給 .then 程序
requestData
  .then((imgPath) => {
    console.log("imgPath:", imgPath)

    // 撰寫路由
    app.get("/", (req, res) => {
      res.send(`
        <h1>DOG PAGE</h1>
        <img src="${imgPath}" alt="${imgPath}" style="display: block;">
        `)
    })

  })
  // 使用物件實例: 若連線錯誤則得到 reject
  .catch((error) => {
    console.warn(error)
  })

// 啟動伺服器
const port = 3000
app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`)
})

