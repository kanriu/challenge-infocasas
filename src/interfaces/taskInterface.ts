export interface SubTask {
  id: string;
  description: string;
  isCompleted: boolean;
  isFocus: boolean;
}
export interface Task {
  id: string;
  title: string;
  subTasks: SubTask[];
  isFinalized: boolean;
}
