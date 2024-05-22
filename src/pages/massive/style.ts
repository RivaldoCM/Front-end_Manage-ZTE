import { DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";

interface IOffCard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    offCardOpen?: boolean;
}

export const Container = styled.div`
    min-width: 100%;
    min-height: calc(100vh - 200px);
    padding: .5rem 0;
    .add-massive{
        position: fixed;
        bottom: 16px;
        right: 1rem;
    }
`;

export const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 400px);
    justify-content: center;
    gap: .5rem;
    width: 100%;
`;

export const CardController = styled.div`
    position: relative;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: 300px; 
    overflow: hidden;
`;

export const Card = styled.div<IOffCard>`
    position: relative;
    flex-direction: column;
    width: inherit;
    height: inherit;
    padding: .5rem .5rem 2rem .5rem;
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
            font-weight: lighter;
            font-size: 1.2rem;
        }
    }
    .content{
        width: 100%;
        height: 85%;
        padding-top: .5rem;

        .basic-info{
            height: 35%;
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

        .teste{
            width: 100%;
            height: 15%;

            p{
                text-align: end;
            }
        }
    }
`;

export const IconMassivePeople = styled.div`
    position: absolute;
    top: .5rem;
    right: 1rem;
`;

export const MassivePeopleStyle = styled.div`
    position: absolute;
    top: .5rem;
    width: calc(100% - 6rem);
    height: 250px;
    text-align: center;
    background: white;
    border-radius: .5rem;
    box-shadow: 0px 0px 15px 23px rgba(0,0,0,0.1);
    overflow: auto;

    .clients{
        position: relative;
        flex-direction: column;

        .client{
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            height: inherit;
            text-align: start;
            padding: .5rem;

            p{
                font-size: .8rem;
            }
        }
    }
`;

//------------------------OFF-CARD------------------------//

export const OffCard = styled.div<IOffCard>`
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: calc(100% - 3rem);
    height: 250px;
    padding: 0 0.5rem;
    background: rgba(231, 219, 219, 0.53);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(8, 174, 215, 0.3);
    transform: ${(props) => props.offCardOpen ? 'translateY(5%)' : 'translateY(96%)'};
    transition: .2s ease-in-out;

    .off-card-button{
        z-index: 3;
        overflow: hidden;
        color: #ffffff;
        
        :hover{
            background-color: transparent;
        }
    }

    .off-card-information{
        height: 60%;
    }

    .off-card-action-buttons{
        justify-content: space-evenly;
        width: 100%;
        height: 20%;
    }
`;

export const FormAddMassive = styled.form`
    flex-direction: column;
    width: 464px;
    height: auto;
    padding: 1rem 1rem 0 1rem;
    text-align: left;
    background: #fff;
    border-radius: 8px;
    user-select: none;

    .date-timer{
        position: absolute;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 100px 49px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1);
        border-radius: 1rem;
        z-index: 99;
    }
`
export const FormAddPeopleMassive = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    width: 464px;
    padding: .5rem .5rem 0 .5rem;
    text-align: center;
    background: #fff;
    border-radius: 8px;
`;