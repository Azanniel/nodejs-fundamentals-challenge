import { Database } from '../database/database.js'

const database = new Database()

export async function deleteTask(request, response) {
  const { id } = request.params

  const [task] = database.select('tasks', { id })

  if (!task) {
    return response.writeHead(404).end()
  }

  database.delete('tasks', id)

  return response.writeHead(204).end()
}
