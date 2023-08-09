import Wrapper from '@/common/components/Wrapper';
import Home from '@/modules/home';
import TaskList from '@/modules/task';

export default function HomePage() {
  return (
    <Wrapper>
      <Home />
      <TaskList />
    </Wrapper>
  );
}
