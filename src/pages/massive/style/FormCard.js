import styled from 'styled-components';

export const FormCardContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormCardLabel = styled.label`
  display: flex;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const FormCardInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px 0;
`;

export const FormCardSelect = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px 0;
`;

export const FormCardSalvarButton = styled.button`
  width: 80px;
  background-color: white;
  color: black;
  padding: 8px 15px;
  margin: 10px auto;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
