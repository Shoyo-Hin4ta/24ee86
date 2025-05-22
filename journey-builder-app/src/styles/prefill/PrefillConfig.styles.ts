import styled from 'styled-components';

export const PrefillContainer = styled.div`
  flex: 1;
  padding: 24px;
  height: 100vh;
  overflow-y: auto;
  background-color: #f9faff;
`;

export const Header = styled.h1`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
  color: #333;
`;

export const PrefillToggle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ToggleLabel = styled.label`
  font-size: 16px;
  margin-right: auto;
  color: #555;
`;

export const ToggleSwitch = styled.div<{ $enabled: boolean }>`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${props => props.$enabled ? '#4c63e3' : '#ccc'};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    ${props => props.$enabled ? 'right: 2px;' : 'left: 2px;'}
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s ease, left 0.2s ease, right 0.2s ease;
  }
`;

export const NoFormSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 150px);
  width: 100%;
  color: #666;
  font-size: 18px;
  text-align: center;
  margin-top: 75px;
  
  &::before {
    content: '';
    display: block;
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'%3E%3C/path%3E%3Cpolyline points='13 2 13 9 20 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.7;
  }
`;

export const FieldsList = styled.div`
  margin-top: 30px;
`;

export const FieldItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  background-color: #fafafa;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FieldIcon = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const FieldName = styled.div`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

export const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: #f0f0f0;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
    color: #666;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.color || '#4c63e3'};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.color || '#3b50c9'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const PrefillValue = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #f0f5ff;
  border-radius: 4px;
  color: #4c63e3;
  font-size: 14px;
  margin-right: 16px;
`;