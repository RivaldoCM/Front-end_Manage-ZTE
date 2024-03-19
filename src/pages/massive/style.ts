import styled from "styled-components";

export const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 400px);
    justify-content: center;
    gap: 1rem;
    width: 100%;
    margin: 1rem;
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
    padding: .5rem .5rem 2.5rem .5rem;
    background-color: #D8DEE9;
    border: 2px solid #B6BEC2;
    border-radius: 1.5rem;
    overflow: hidden;

    .header{
        flex-direction: column;
        width: 100%;
        height: 20%;

        p{
            font-weight: lighter;
            font-size: 1.2rem;
        }
    }
    .content{
        width: 100%;
        height: 80%;
        padding-top: 1rem;

        .basic-info{
            height: 50%;
            overflow: scroll;
            p{
                margin: .2rem 0;
            }
        }


        .description{
            align-items: flex-start;

            height: 50%;
            padding: .5rem;
            overflow: scroll;
        }
    }
`

export const OffCard = styled.div`
    position: absolute;
    width: calc(100% - 6rem);
    height: 250px;
    border-radius: 1rem;
    background-color: #B6BEC2  ;
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