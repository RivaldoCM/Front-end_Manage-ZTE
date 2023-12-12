import styled from 'styled-components';


export const CardConteiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`

export const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    width: 30%;
    max-width: 450px;
    height: auto;
    padding: 2%;
    background: #ff8006;
    border-radius: 5%;
    margin: 0.5rem;
    transition: all 0.3s;
    display: flex;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    box-shadow: 0 0 10px rgba(0, 0, 0, 2);
`
export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
    padding-bottom: 10px;
`

export const FecharCardButton = styled.button`
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    transition: transform 0.3s ease;

    &:hover {
    color: #555;
    transform: scale(1.1);
    }
`

export const ErrorMessage = styled.span`
    color: black;
    font-size: 18px;
    margin-top: 5px;
    font-weight: bold;
`