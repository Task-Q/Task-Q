import express from 'express'

const PORT = 8081
const app = express()

app.get('/', (req, res) => {
    res.end('sup');
});
app.listen(PORT)

console.log('started on ' + PORT)