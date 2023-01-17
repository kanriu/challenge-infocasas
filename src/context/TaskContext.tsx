import {createContext, useReducer, useEffect} from 'react';
import {tasksData} from '../data/tasks';
import {Task} from '../interfaces/taskInterface';
import {taskReducer, TaskState} from './taskReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TaskContextProps = {
  tasks: Task[];
  isModal: boolean;
  selectedTask: Task;
  removeTask: () => void;
  callModal: (value: boolean) => void;
  addSelectedTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  addTask: (task: Task) => void;
  checkCompleted: (task: Task) => void;
};

const taskInitialState: TaskState = {
  tasks: tasksData,
  isModal: false,
  selectedTask: {
    id: '',
    title: '',
    subTasks: [],
    isFinalized: false,
  },
};

export const TaskContext = createContext({} as TaskContextProps);

export const TaskProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(taskReducer, taskInitialState);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem('tasks');
    value !== null
      ? dispatch({type: 'storageTask', payload: JSON.parse(value)})
      : await AsyncStorage.setItem('tasks', JSON.stringify(tasksData));
  };

  const removeTask = () => {
    dispatch({type: 'removeTask'});
  };
  const callModal = (value: boolean) => {
    dispatch({type: 'callModal', payload: value});
  };
  const addSelectedTask = (task: Task) => {
    dispatch({type: 'addSelectedTask', payload: task});
  };
  const updateTask = (task: Task) => {
    dispatch({type: 'updateTask', payload: task});
  };
  const addTask = (task: Task) => {
    dispatch({type: 'addTask', payload: task});
  };
  const checkCompleted = (task: Task) => {
    dispatch({type: 'checkCompleted', payload: task});
  };
  return (
    <TaskContext.Provider
      value={{
        ...state,
        removeTask,
        callModal,
        addSelectedTask,
        updateTask,
        addTask,
        checkCompleted,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
