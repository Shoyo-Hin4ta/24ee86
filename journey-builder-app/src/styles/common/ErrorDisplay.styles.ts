import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  color: #721c24;
  background-color: #f8d7da;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const ErrorTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
`;

export const RetryButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;