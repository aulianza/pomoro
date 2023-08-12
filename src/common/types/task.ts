export interface TaskProps {
  id: string;
  title: string;
  is_completed: boolean;
  label?: string;
  due_date?: string;
  start_time?: string;
  end_time?: string;
  created_at: string;
  note?: string;
}
