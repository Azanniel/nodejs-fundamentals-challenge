import { randomUUID } from 'node:crypto'
import { Database } from '../database/database.js'

const database = new Database()

export async function createTask(request, response) {
  const { title, description } = request.body

  if (!title) {
    return response.writeHead(400).end(
      JSON.stringify({
        message: 'title is required',
      }),
    )
  }

  if (!description) {
    return response.writeHead(400).end(
      JSON.stringify({
        message: 'description is required',
      }),
    )
  }

  const task = {
    id: randomUUID(),
    title,
    description,
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await database.insert('tasks', task)

  return response.writeHead(201).end()
}
