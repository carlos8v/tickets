import { server } from './server'

const port = process.env.PORT || 3333
server.listen(port, () => console.log(`Server started at port ${port}`))
