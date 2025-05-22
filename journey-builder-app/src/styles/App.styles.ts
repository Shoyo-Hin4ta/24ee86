import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const ErrorFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  color: #721c24;
  background-color: #f8d7da;
`;