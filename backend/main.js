require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getBoardFromOpenAI = async board => {
  try {
    board = boardStringGPT(board)
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
      Estamos jugando tic tac toe.
      Tu eres el Player O y te enfrentaras al Player X.
      Te toca marcar una casilla en el siguiente tablero:\n\n
      ${board}\n
      El Player O, ingresa un movimiento con la letra O y responde solo dibujando el tablero.\n`,
      temperature: 0.5,
      max_tokens: 22,
      n: 1,
    });

    return completion.data.choices[0].text
  } catch (e) {
    console.error(e.message)
  }
}

const boardStringGPT = board => {
  let res = ''
  for (i in board) {
    const row = board[i]
    res = res.concat(`[${row[0] || '-'}|${row[1] || '-'}|${row[2] || '-'}]\n`)
  }

  return res
}

const parseBoardGPT = boardGPT => {
  let res = []
  board = boardGPT.trim().split('\n')

  for (i in board) {
    const row = board[i]

    if (row.includes('X') || row.includes('O')) {
      const newRow = row.match(/[XO\-]/g).map(x => x == '-' ? '' : x)
      res.push(newRow)
    } else {
      res.push(['', '', ''])
    }
  }

  return res
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/tic-tac-toe', async (req, res) => {
  const { board } = req.body
  console.log('----------')
  console.log(board)
  const results = await getBoardFromOpenAI(board)
  console.log('result: ', results)
  const parseResults = parseBoardGPT(results)
  res.send(parseResults)
})

app.listen(port, () => {
  console.log(`App server in port: ${port}`)
})
