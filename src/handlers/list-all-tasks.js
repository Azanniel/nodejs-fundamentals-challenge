import { Database } from '../database/database.js'

const database = new Database()

export async function listAllTasks(request, response) {
  const { search } = request.query

  const decodedSearch = search ? decodeURI(search) : null

  const tasks = await database.select(
    'tasks',
    decodedSearch && {
      title: decodedSearch,
      description: decodedSearch,
    },
  )

  return response.end(JSON.stringify(tasks))
}
