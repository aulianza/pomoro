'use client';

import Wrapper from '@/common/components/Wrapper';
import Settings from '@/modules/settings';

// interface TimerModeEditorProps {
//   mode: string;
// }

// const TimerModeSettings = ({ mode }: TimerModeEditorProps) => {
//   const { currentTimerMode, setCurrentTimerMode } = useTimerStore();
//   const { timerMode, setTimerMode } = useTimerModeStore();

//   const modeData = timerMode.find((modeData) => modeData.mode === mode);

//   const handleTimeUpdate = (newTime: number) => {
//     if (newTime > 0 && modeData) {
//       const updatedMode: TimerModeProps = {
//         mode: modeData.mode,
//         title: modeData.title,
//         time: newTime,
//       };
//       setTimerMode(updatedMode);

//       if (currentTimerMode.mode === mode) {
//         setCurrentTimerMode(updatedMode);
//       }
//     }
//   };

//   if (!modeData) {
//     return null;
//   }

//   return (
//     <div>
//       <div key={modeData.mode}>
//         <span>{modeData.title}</span>
//         <input
//           type='number'
//           value={modeData.time}
//           onChange={(e) => handleTimeUpdate(parseInt(e.target.value))}
//         />
//       </div>
//     </div>
//   );
// };

export default function SettingsPage() {
  return (
    <Wrapper>
      <Settings />
      {/* <div>
        <TimerModeSettings mode='focus' />
        <TimerModeSettings mode='shortBreak' />
        <TimerModeSettings mode='longBreak' />
      </div> */}
    </Wrapper>
  );
}
