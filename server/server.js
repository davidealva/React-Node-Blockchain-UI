const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

const token = '44558fcd7e074ec1924b1a5aa50910e02ea44b8f9b18ed585b03371f7bf610afcc000c185095311a036ea3c5992a8b1f'
const url = 'http://v2-sandbox.api.uledger.co:3000'
// const ip = '52.161.104.222'

// const transaction_hash = 'QmWyzRB2ocXZt92byh7fxx2zmAdBJZCaFqQhxvizVfLXuN' - /view?transaction_hash=QmWyzRB2ocXZt92byh7fxx2zmAdBJZCaFqQhxvizVfLXuN
// const content_hash = 'QmcuPQgeyrNbitxaUcFS2g3TM9w88fpkXnQhAZmBMeCGfa' - /view?content_hash=QmcuPQgeyrNbitxaUcFS2g3TM9w88fpkXnQhAZmBMeCGfa

// "post", "/store/add"  - store content in the blockchain
// "post", "/store/verify" - Verify a transaction using its Transaction Hash
// "post", "/store/getTransactions" - Query transactions identified by any of the data passed
// "post", "/store/getTransactionsAndContents" - returns content by transaction_hash or content_hash


// API call with Axios
const callApi = (url, token, data) => {
  return axios(`${url}`,{
          method: 'post',
          headers: {
            "Content-Type": "raw",
            "token": `${token}`
          },
          data: data
        })
        .then(res => {
          this.res = res.data
          console.log(this.res)
          return this.res
        })
        .catch(error => {
          console.log(error);
        });
}

// index route
app.get('/', (req, res) => {
  res.send('In Index')
})

// /addContent route  - writeAddContent
app.get('/add/content', (req, res) => {

  const ip = url+'/store/add'

  // content to base64
  const query = req.query.content
  const content = new Buffer(query)
  const content64 = content.toString('base64')

  //need to grab content and tag
  const data = {
    content: content64,
    tags: req.query.tags.split(',')
  }

  callApi(ip, token, data)
  .then(data => {
    res.send({
      data: data.result
    })
  })

})


// /viewTransaction route - viewTransaction By Transaction Hash or Content Hash
app.get('/query/hash', (req, res) => {

  const ip = url+'/store/getTransactionsAndContents'
  const data = req.query

  console.log(data)

  if (!req.query.content_hash) {
    console.log('query is transaction')
    callApi(ip, token, data)
    .then(data => {
      res.send({
        // content: data.result[0],
        // data: data.result[1]
        data: data.result
      })
    })
  }
  else {
    console.log('query is content')
    callApi(ip, token, data)
    .then(data => {
      res.send({
        content: data.result[0],
        data: data.result[1]
      })
    })
  }
})

// /viewContents route - view by any query submited other than transaction or content hash
app.get('/query/date', (req, res) => {

  const ip = url+'/store/getTransactions'
  let from = req.query.from
  from = parseInt(from)
  let to = req.query.to
  to = parseInt(to)

  const data = {
    range: {
      From: from,
      To: to
    }
  }

  const dataJson = JSON.stringify(data)

  console.log(dataJson)
  callApi(ip, token, dataJson)
  .then(data => {
    res.send({
      data: data.result
    })
  })
})

// /viewContents route - view by any query submited other than transaction or content hash
app.get('/query/tags', (req, res) => {

  const ip = url+'/store/getTransactions'
  const data = {
    tags: req.query.tags.split(',')
  }
  console.log(data)
  callApi(ip, token, data)
  .then(data => {
    res.send({
      data: data.result
    })
  })
})


app.get('/query/content', (req, res) => {

  const ip = url+'/store/getTransactions'
  const query = req.query.content
  const content = new Buffer(query)
  const content64 = content.toString('base64')

  const data = {
    content: content64
  }

  console.log(data)

  callApi(ip, token, data)
  .then(data => {
    res.send({
      data: data.result
    })
  })
})


// /downloadFromServer route - downloadFromServer
app.get('/download', (req, res) => {

})

// /addFile route - writeAddFile
app.get('/upload', (req, res) => {
  const ip = url+'/store/add'

  // content to base64
  const query = req.query.file
  const content = new Buffer(query)
  const content64 = content.toString('base64')

  //need to grab content and tag
  const data = {
    content: content64,
    tags: req.query.tags.split(',')
  }

  callApi(ip, token, data)
  .then(data => {
    res.send({
      data: data.result
    })
  })
})


app.listen(port, () => console.log(`Listening on port ${port}`));
