import styled from 'styled-components';

export const ErrorContainer = styled.div`
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #fff8f8;
  border: 1px solid #f5c6cb;
  color: #721c24;
`;

export const ErrorTitle = styled.h3`
  margin-top: 0;
  font-size: 18px;
  font-weight: 600;
`;

export const ErrorMessage = styled.p`
  margin-bottom: 15px;
`;

export const ErrorStack = styled.pre`
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
  overflow: auto;
  max-height: 200px;
  border: 1px solid #eee;
`;

export const ResetButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #0069d9;
  }
`;