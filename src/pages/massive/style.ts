import styled from "styled-components";

export const Cards = styled.div`
    width: 100%;
    display: grid;
    justify-content: space-evenly;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, 350px);
    margin: 1.5rem 2vw;
    align-content: center;
`

export const CardController = styled.div`
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 300px; 
    overflow: hidden;
    z-index: 10;
`

export const Card = styled.div`
    position: relative;
    flex-direction: column;
    border: 2px solid #a0a0a0;
    width: inherit;
    height: inherit; 
    background-color: #fffeef;

    overflow: hidden;
    z-index: 1;
`

export const OffCard = styled.div`
    position: absolute;
    width: calc(100% - 6rem);
    height: 250px;
    border-radius: 1rem;
    background-color: #a0a0a0;
    transform: ${(props) => props.offCardOpen ? 'translateY(5%)' : 'translateY(100%)'};
    transition: .2s ease-in-out;
    z-index: 2;

    .off-card-button{
        position: relative;
        top: -50%;
        background-color: #e9e9e9;
        z-index: 3;
        overflow: hidden;
    }
`