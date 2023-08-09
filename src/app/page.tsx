import TaskList from '@/modules/task';

export default function Home() {
  return (
    <main className='flex flex-col'>
      pomoro app
      <TaskList />
    </main>
  );
}
