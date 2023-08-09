import Home from '@/modules/home';
import TaskList from '@/modules/task';

export default function Page() {
  return (
    <main className='flex flex-col'>
      <Home />
      <TaskList />
    </main>
  );
}
