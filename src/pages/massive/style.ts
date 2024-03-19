import styled from "styled-components";

export const Container = styled.div`
    min-width: calc(100vw - 65px);
    min-height: calc(100vh - 64px);
    padding: 1rem;

    .add-massive{
        position: absolute;
        bottom: 32px;
        right: 2rem;
    }
`

export const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 400px);
    justify-content: center;
    gap: 1rem;
    width: 100%;
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
    filter: ${(props) => props.offCardOpen ? 'blur(2px)' : 'blur(0)'};

    .header{
        flex-direction: column;
        width: 100%;
        height: 20%;

        p{
            text-decoration: underline;
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
            overflow: auto;
            p{
                margin: .2rem 0;
            }
        }


        .description{
            align-items: flex-start;
            height: 50%;
            padding: .5rem;
            overflow: auto;

            p{
                text-align: center;
            }
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