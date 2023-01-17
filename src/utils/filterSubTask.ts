import {Task} from '../interfaces/taskInterface';

export const filterSubTask = (task: Task, id: string) => {
  const subTasksFilter = task.subTasks.filter(item => item.id !== id);
  return {...task, subTasks: subTasksFilter};
};
