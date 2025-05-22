import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 800px;
  max-width: 90%;
  max-height: 85vh;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  background-color: white;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  overflow-y: auto;
  flex: 1;
  height: 550px;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  border-radius: 0 0 8px 8px;
`;

export const SourceListSection = styled.div`
  width: 50%;
  border-right: 1px solid #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const FieldListSection = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fcfcfd;
`;

export const SectionTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

export const AccordionItem = styled.div`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const AccordionHeader = styled.div<{ $isActive: boolean; $type?: string }>`
  padding: 12px 16px;
  background-color: ${props => {
    if (props.$isActive) {
      switch(props.$type) {
        case 'direct': return '#e6f7ff';
        case 'transitive': return '#f0f5ff';
        case 'global': return '#f0fff4';
        default: return '#f5f8ff';
      }
    }
    return '#fff';
  }};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  
  &:hover {
    background-color: ${props => {
      switch(props.$type) {
        case 'direct': return '#e6f7ff';
        case 'transitive': return '#f0f5ff';
        case 'global': return '#f0fff4';
        default: return '#f5f8ff';
      }
    }};
  }
`;

export const SourceType = styled.span<{ $type?: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 12px;
  min-width: 100px;
  background-color: ${props => {
    switch(props.$type) {
      case 'direct': return '#1890ff';
      case 'transitive': return '#4c63e3';
      case 'global': return '#52c41a';
      default: return '#999';
    }
  }};
  color: white;
  font-weight: 500;
  text-transform: uppercase;
`;

export const DetailSourceType = styled(SourceType)`
  font-size: 14px;
`;

export const DetailSection = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

export const DetailTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  flex-grow: 1;
`;

export const DetailValue = styled.div`
  margin-bottom: 20px;
`;

export const DetailValueTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const DetailContent = styled.div`
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  overflow-x: auto;
  color: #333;
  word-break: break-word;
`;

export const DetailPath = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  
  svg {
    margin: 0 6px;
    color: #999;
  }
`;

export const PathSegment = styled.span<{ $type?: string }>`
  padding: 2px 8px;
  background-color: ${props => {
    switch(props.$type) {
      case 'direct': return '#e6f7ff';
      case 'transitive': return '#f0f5ff';
      case 'global': return '#f0fff4';
      default: return '#f5f5f5';
    }
  }};
  border-radius: 4px;
  color: #333;
`;

export const DetailFooter = styled.div`
  font-size: 14px;
  color: #666;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

export const NoSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  height: 100%;
  color: #666;
  text-align: center;
  
  &::before {
    content: "";
    display: block;
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='8 18 12 22 16 18'%3E%3C/polyline%3E%3Cpolyline points='8 6 12 2 16 6'%3E%3C/polyline%3E%3Cline x1='12' y1='2' x2='12' y2='22'%3E%3C/line%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const AccordionTitle = styled.div`
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AccordionArrow = styled.span<{ $isOpen: boolean }>`
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  color: #666;
  font-weight: bold;
`;

export const AccordionContent = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  background-color: white;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  padding-left: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 12px center;
  
  &:focus {
    outline: none;
    border-color: #4c63e3;
    box-shadow: 0 0 0 2px rgba(76, 99, 227, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const List = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: white;
`;

export const FieldItem = styled.div<{ $type?: string }>`
  padding: 10px 16px;
  padding-left: 24px;
  cursor: pointer;
  margin: 2px 0;
  border-radius: 4px;
  color: #333;
  
  &:hover {
    background-color: ${props => {
      switch(props.$type) {
        case 'direct': return '#e6f7ff';
        case 'transitive': return '#f0f5ff';
        case 'global': return '#f0fff4';
        default: return '#f0f0f0';
      }
    }};
  }
`;

export const FieldItemSelected = styled.div<{ $type?: string }>`
  padding: 10px 16px;
  cursor: pointer;
  background-color: ${props => {
    switch(props.$type) {
      case 'direct': return '#e6f7ff';
      case 'transitive': return '#e0e6ff';
      case 'global': return '#f0fff4';
      default: return '#e0e6ff';
    }
  }};
  border-left: 3px solid ${props => {
    switch(props.$type) {
      case 'direct': return '#1890ff';
      case 'transitive': return '#4c63e3';
      case 'global': return '#52c41a';
      default: return '#4c63e3';
    }
  }};
  margin: 2px 0;
  border-radius: 0 4px 4px 0;
  color: #333;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => {
      switch(props.$type) {
        case 'direct': return '#bae7ff';
        case 'transitive': return '#d8dfff';
        case 'global': return '#d9f7be';
        default: return '#d8dfff';
      }
    }};
  }
`;

export const Button = styled.button`
  padding: 10px 16px;
  margin-left: 12px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
`;

export const CancelButton = styled(Button)`
  border: 1px solid #ddd;
  background-color: white;
  color: #555;
  text-transform: uppercase;
  font-weight: 600;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SelectButton = styled(Button)<{ $disabled: boolean }>`
  background-color: ${props => props.$disabled ? '#ccc' : '#4c63e3'};
  color: white;
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  text-transform: uppercase;
  font-weight: 600;
  
  &:hover {
    background-color: ${props => props.$disabled ? '#ccc' : '#3b50c9'};
  }
`;