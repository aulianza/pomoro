import styled from '@emotion/styled';
import { MouseEvent, ReactNode } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import Sheet from 'react-modal-sheet';

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
  return (
    <StyledSheet
      isOpen={isOpen}
      onClose={() => onClose(false)}
      detent='content-height'
      className='max-w-[480px] mx-auto'
    >
      <Sheet.Container>
        <Sheet.Header>
          <StyledSheetHeader className='dark:border-b dark:border-b-neutral-700 dark:bg-neutral-800'>
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
        <Sheet.Content className='dark:bg-neutral-800'>
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
