export interface TaskProps {
  id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
  note?: string;
  pomos: number;
}

export type TaskStoreProps = {
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  updateTask: (task: TaskProps) => void;
  deleteTask: (taskId: string) => void;
};
