import { Database } from '../database/database.js'

const database = new Database()

export async function updateTask(request, response) {
  const { id } = request.params
  const { title, description } = request.body

  if (!title && !description) {
    return response
      .writeHead(400)
      .end(JSON.stringify({ message: 'title or description are required' }))
  }

  const [task] = database.select('tasks', { id })

  if (!task) {
    return response.writeHead(404).end()
  }

  const taskUpdated = {
    ...task,
    title: title || task.title,
    description: description || task.description,
    updatedAt: new Date(),
  }

  database.update('tasks', id, taskUpdated)

  return response.writeHead(204).end()
}
