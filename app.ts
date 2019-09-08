import express from 'express'

let port = process.env.PORT;
if (port == null || port == "") {
  port = "8081";
}

const app = express()

app.get('/test', (req, res) => {
    res.end('testing');
});
app.listen(port)

console.log('started on ' + port)