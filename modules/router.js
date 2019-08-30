const express = require('express')
const path = require('path')
const data = require ('./data')
const router = express.Router()

router.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'../pages/index.html'))
})

router.get('/productos', (req, res)=>{
  res.sendFile(path.join(__dirname,'../pages/productos.html'))
})

router.get('/Api/productos', (req, res)=>{
  res.json(data)
})

router.use((req, res)=>{
  res.status(404).send('pifiaste wache')
})


module.exports = router