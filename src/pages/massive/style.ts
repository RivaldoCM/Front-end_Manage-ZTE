import styled from "styled-components";

export const Cards = styled.div`
    width: 100%;
    display: grid;
    background-color: #eaeef6;
    grid-template-columns: repeat(auto-fit, 400px);
    justify-content: center;
    gap: 1rem;
`

export const CardController = styled.div`
    position: relative;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: 300px; 
    overflow: hidden;
`

export const Card = styled.div`
    position: relative;
    flex-direction: column;
    width: inherit;
    height: inherit; 
    background-color: #E8E8E8;
    border: 2px solid #fff;
    border-radius: 1.5rem;
    overflow: hidden;
`

export const OffCard = styled.div`
    position: absolute;
    width: calc(100% - 6rem);
    height: 250px;
    border-radius: 1rem;
    background-color: #fff;
    transform: ${(props) => props.offCardOpen ? 'translateY(5%)' : 'translateY(100%)'};
    transition: .2s ease-in-out;

    .off-card-button{
        position: relative;
        top: -50%;
        background-color: #e9e9e9;
        z-index: 3;
        overflow: hidden;
    }
`