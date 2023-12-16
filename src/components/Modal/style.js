import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: #ff7400;
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 5%;
  box-shadow: none;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const ModalContent = styled.div`
  width: inherit;
  height: auto;
  text-align: justify;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
