import {Task} from '../interfaces/taskInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TaskState {
  tasks: Task[];
  isModal: boolean;
  selectedTask: Task;
}

type TaskAction =
  | {type: 'storageTask'; payload: Task[]}
  | {type: 'callModal'; payload: boolean}
  | {type: 'removeTask'}
  | {type: 'addSelectedTask'; payload: Task}
  | {type: 'updateTask'; payload: Task}
  | {type: 'addTask'; payload: Task}
  | {type: 'checkCompleted'; payload: Task};

const storeData = async (tasksData: Task[]) => {
  await AsyncStorage.setItem('tasks', JSON.stringify(tasksData));
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case 'storageTask':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'callModal':
      return {...state, isModal: action.payload};
    case 'addSelectedTask':
      return {...state, selectedTask: action.payload};
    case 'removeTask':
      const tasksFilter = state.tasks.filter(
        item => item.id !== state.selectedTask.id,
      );
      storeData(tasksFilter);
      return {
        ...state,
        tasks: tasksFilter,
      };
    case 'updateTask':
      const tasksMap = state.tasks.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
      storeData(tasksMap);
      return {
        ...state,
        tasks: tasksMap,
      };
    case 'addTask':
      const newTasks = [...state.tasks, action.payload];
      storeData(newTasks);
      return {
        ...state,
        tasks: newTasks,
      };
    case 'checkCompleted':
      const isFinalized = action.payload.subTasks.every(
        currentValue => currentValue.isCompleted,
      );
      const tasksFinalized = state.tasks.map(item =>
        item.id === action.payload.id ? {...action.payload, isFinalized} : item,
      );
      storeData(tasksFinalized);
      return {
        ...state,
        tasks: tasksFinalized,
      };
    default:
      return state;
  }
};
