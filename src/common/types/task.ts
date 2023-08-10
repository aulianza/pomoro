export interface TaskProps {
  id: number;
  title: string;
  is_completed: boolean;
  label?: string;
  due_date?: Date;
  start_time?: string;
  end_time?: string;
  created_at: Date;
  notes?: string;
}
