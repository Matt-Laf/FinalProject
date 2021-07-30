const express = require("express")
const morgan = require("morgan")

const PORT = 8000

express()
  .use(morgan("dev"))
  .use(express.json())




.listen(PORT, () => (console.log(`listening on port ${PORT}`)))