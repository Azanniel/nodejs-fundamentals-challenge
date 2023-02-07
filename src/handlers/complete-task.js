import { Database } from '../database/database.js'

const database = new Database()

export async function completeTask(request, response) {
  const { id } = request.params

  const [task] = database.select('tasks', { id })

  if (!task) {
    return response.writeHead(404).end(
      JSON.stringify({
        message: 'task is not exists',
      }),
    )
  }

  const taskChanged = {
    ...task,
    completedAt: task.completedAt ? null : new Date(),
  }

  database.update('tasks', id, taskChanged)

  console.log(task, taskChanged)

  return response.writeHead(204).end()
}
