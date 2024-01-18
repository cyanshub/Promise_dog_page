// 每日一狗圖．Callback 版
// 載入專案模組
let error = false
const express = require("express")
const app = express()
let https = require('https')


// 建立名為 requestData 的物件實例
let requestData = new Promise((resolve, reject) => {
  // 相當於 setTimeout(() => { ... }, 0)
  https.get('https://webdev.alphacamp.io/api/dogs/random', (res) => {
    let data = ''
    // 如果連線錯誤, 則讓物件實例回傳 reject
    if (error) {
      return reject("error happen")
    }

    // 如果連線錯誤, 則讓物件實例回傳 reject
    res.on('error', (e) => {
      console.warn(e)
      return reject(e)
    })

    // 如果正常運作, 則讓物件實例回傳 resolve
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      console.log("回傳資料:", JSON.parse(data))
      // 回傳物件中所需要訊息
      resolve(JSON.parse(data).message)
    })
  })
})


// 使用物件實例得到回傳的 resolve
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

