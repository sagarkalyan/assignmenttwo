const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('./db/db')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {

  const database = await ctx.request.body.title
  const item = await show(database)
  ctx.body = item

})

async function show(title) {

  try {
    const Data = await pool.query(`SELECT * FROM movieList WHERE movieTitle  LIKE '%${title}%'`)
    return Data[0]

  } catch (error) {
    console.log(error)
  }

}
module.exports = app.callback()