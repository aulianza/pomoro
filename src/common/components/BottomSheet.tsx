'use client';

import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { BottomSheet as BottomSheetComponent } from 'react-spring-bottom-sheet';

import 'react-spring-bottom-sheet/dist/style.css';

type BottomSheetProps = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
};

const BottomSheet = ({
  title,
  children,
  isOpen,
  onClose,
}: BottomSheetProps) => {
  const { resolvedTheme } = useTheme();
  const [bgColor, setBgColor] = useState('#fff');

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setBgColor('#171717');
    } else {
      setBgColor('#fff');
    }
  }, [resolvedTheme]);

  const sheetStyle = { '--rsbs-bg': bgColor } as React.CSSProperties;

  return (
    <BottomSheetComponent
      open={isOpen}
      onDismiss={() => onClose(false)}
      header={<div className='py-1'>{title}</div>}
      style={sheetStyle}
    >
      <>{children}</>
    </BottomSheetComponent>
  );
};

export default BottomSheet;
