'use client';

import styled from '@emotion/styled';
import { MouseEvent, ReactNode, useRef } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import Sheet, { SheetRef } from 'react-modal-sheet';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

type BottomSheetProps = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  isEffect?: boolean;
  onClose: (isOpen: boolean) => void;
};

const BottomSheet = ({
  title,
  children,
  isOpen,
  onClose,
  isEffect,
}: BottomSheetProps) => {
  const ref = useRef<SheetRef>(null);
  const isKeyboardOpen = useDetectKeyboardOpen();

  const isIOSDevice =
    typeof navigator !== 'undefined' &&
    /(iPhone|iPad)/i.test(navigator.userAgent);

  const keyboardHeight =
    isIOSDevice &&
    isKeyboardOpen &&
    window.visualViewport &&
    window.innerHeight - window.visualViewport.height + 'px';

  return (
    <StyledSheet
      ref={ref}
      isOpen={isOpen}
      onClose={() => onClose(false)}
      rootId={isEffect ? '__next' : ''}
      detent='content-height'
      className='max-w-[480px] mx-auto'
    >
      <Sheet.Container
        style={{
          paddingBottom: keyboardHeight || '0',
          transition: 'padding 200ms',
        }}
      >
        <Sheet.Header>
          <StyledSheetHeader className='dark:border-b dark:border-b-neutral-700 dark:bg-neutral-900'>
            <div className='font-semibold'>{title}</div>
            <CloseIcon
              size={22}
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                onClose(false);
              }}
              className='cursor-pointer font-semibold'
            />
          </StyledSheetHeader>
        </Sheet.Header>
        <Sheet.Content className='dark:bg-neutral-900'>
          {children}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => onClose(false)} />
    </StyledSheet>
  );
};

export default BottomSheet;

const StyledSheet = styled(Sheet)`
  .react-modal-sheet-container {
    border-top-right-radius: 1rem !important;
    border-top-left-radius: 1rem !important;
  }

  .react-modal-sheet-header {
    height: 30px !important;
  }
`;

const StyledSheetHeader = styled.div`
  border-top-right-radius: 0.9rem !important;
  border-top-left-radius: 0.9rem !important;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.8rem !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
`;
