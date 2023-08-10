import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Sheet from 'react-modal-sheet';

type BottomSheetProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
};

const BottomSheet = ({ children, isOpen, onClose }: BottomSheetProps) => {
  return (
    <StyledSheet
      isOpen={isOpen}
      onClose={() => onClose(false)}
      detent='content-height'
      className='max-w-[480px] mx-auto'
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
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
