// 每日一狗圖．Callback 版
// 載入專案模組
let error = false
const express = require("express")
const app = express()
let https = require('https')

// 將匿名函式指定給 requestData, 等同宣告 function requestData, 執行時建立物件實例
let requestData = () => {
  // 回傳建立物件實例
  return new Promise((resolve, reject) => {
    https.get('https://webdev.alphacamp.io/api/dogs/random', (res) => {
      let data = ''

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
        console.log(JSON.parse(data).message)      
        resolve(JSON.parse(data).message)
      })
    }) 
  })
}


// 撰寫路由
app.get("/", (req, res) => {
  // 使用物件實例得到回傳的 resolve
  requestData()
    .then((imgPath) => {
      console.log("imgPath:", imgPath)

      res.send(`
        <h1>DOG PAGE</h1>
        <img src="${imgPath}" alt="${imgPath}" style="display: block;">
        `)
    })

    // 使用物件實例: 若連線錯誤則得到 reject
    .catch((error) => {
      console.warn(error)
    })
})


// 啟動伺服器
const port = 3000
app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`)
})

