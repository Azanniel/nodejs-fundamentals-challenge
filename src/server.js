import http from 'node:http'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'
import { json } from './middlewares/json-middleware.js'

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (!route) {
    return response.writeHead(404).end()
  }

  const routeParams = request.url.match(route.path)
  const { query, ...params } = routeParams.groups

  request.query = query ? extractQueryParams(query) : {}
  request.params = params

  return route.handler(request, response)
})

server.listen(3000)
