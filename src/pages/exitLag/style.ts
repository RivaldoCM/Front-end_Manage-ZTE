import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    height: 480px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const CloseButton = styled.span`
    align-self: flex-end;
    cursor: pointer;
    font-size: 18px;
    margin-bottom: 10px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    background-color: #1976d2;
    color: white;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-size: 16px;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

export const Title = styled.h2`
    margin-bottom: 15px;
`;
