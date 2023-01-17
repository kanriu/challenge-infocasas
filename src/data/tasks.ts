import {Task} from '../interfaces/taskInterface';

export const tasksData: Task[] = [
  {
    id: '1',
    title: 'Pantalla Login',
    subTasks: [
      {
        id: '1',
        description: 'Realizar interfaz',
        isCompleted: false,
        isFocus: false,
      },
      {
        id: '2',
        description: 'Completar lógica',
        isCompleted: false,
        isFocus: false,
      },
      {
        id: '3',
        description: 'Pruebas unitarias',
        isCompleted: false,
        isFocus: false,
      },
    ],
    isFinalized: false,
  },
  {
    id: '2',
    title: 'Pantalla Home',
    subTasks: [
      {
        id: '4',
        description: 'Realizar interfaz',
        isCompleted: false,
        isFocus: false,
      },
      {
        id: '5',
        description: 'Completar lógica',
        isCompleted: false,
        isFocus: false,
      },
    ],
    isFinalized: true,
  },
];
