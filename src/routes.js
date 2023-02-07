import { buildRoutePath } from './utils/build-route-path.js'
import { createTask } from './handlers/create-task.js'
import { deleteTask } from './handlers/delete-task.js'
import { listAllTasks } from './handlers/list-all-tasks.js'
import { updateTask } from './handlers/update-task.js'
import { completeTask } from './handlers/complete-task.js'

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: createTask,
  },

  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: listAllTasks,
  },

  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: updateTask,
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: deleteTask,
  },

  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: completeTask,
  },
]
