import styled from 'styled-components';

export const FormListContainer = styled.div`
  width: 300px;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  background-color: #f2f4ff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
`;

// Use transient props to prevent isSelected prop from being passed to the DOM
export const FormItem = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.$isSelected ? '#4c63e3' : 'white'};
  color: ${props => props.$isSelected ? 'white' : 'black'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.$isSelected ? '#4c63e3' : '#f0f0f0'};
  }
`;

export const FormName = styled.h3`
  margin: 0;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
`;

export const FormId = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${props => props.color || '#666'};
`;

export const Header = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #4c63e3;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 16px;
`;

export const LoadingIndicator = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4c63e3;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-right: 12px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #666;
`;