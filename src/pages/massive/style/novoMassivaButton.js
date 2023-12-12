import styled from 'styled-components';

export const NovoMassiva = styled.button`
    background: #ff7400;
    position: fixed;
    bottom: 10px;
    right: 10px;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 2);
    cursor: pointer;
    transition: transform 0.3s ease;

    :hover {
        transform: scale(1.1);
    }
`