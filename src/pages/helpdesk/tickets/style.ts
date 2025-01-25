import styled from "styled-components";

export const Controller = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
    padding: 0 2rem;

    header{
        display: flex;
        justify-content: flex-end;
        width: inherit;
        height: 10%;
        max-height: 56px;
        padding: .5rem 0;
    }
    section:first-of-type{
        justify-content: space-between;
        width: inherit;
        height: 25%;
        padding: .5rem 0;
    }
    section:last-of-type{
        height: 66%;
        margin-bottom: .5rem;
        overflow: auto;
    }
`

export const InfoCard = styled.div`
    width: 212px;
    height: 120px;
    padding: 1rem;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    border-radius: .5rem;

    p:last-of-type{
        font-size: 2rem;
        color: grey;
    }
`;

export const AddTicketStyle = styled.form`
    padding: .5rem;
    max-width: 368px;

    > div:nth-child(1){
        display: flex;
        justify-content: space-between;
        margin-bottom: .5rem;
    }

    >div:nth-child(4){
        display: flex;
        margin: .5rem 0;
        > div {
            justify-content: flex-start;
        }
    }

    > button:last-child {
        margin-top: .5rem;
        width: 100%;
    }
`


export const ViewTicketStyle = styled.div`
    width: 90%;
    max-width: 768px;
    height: inherit;
    background-color: aliceblue;
    padding: 1rem;
    border-radius: 10px;

    *{
        font-family: 'Itim', sans-serif !important;
    }

    header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 10%;
        font-size: 1.3rem;
        button {
            //BOTÃO DO JOY UI
            position: relative !important;
            top: 0;
            left: 0;
        }
    }

    section:first-of-type{
        width: 100%;
        height: 80%;
        div:nth-of-type(2){
            display: flex;
            justify-content: space-around;
            width: inherit;
            box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
            border-radius: 5px;
        }

        div:last-of-type{
            display: flex;
            width: 100%;
            p{
                margin-right: 1rem;
            }
        }

    }
    footer{
        width: 100%;
        height: 10%;
        div {
            width: 33%;
        }
        div:nth-of-type(2){
            div  {
                width: 90% !important;
            }
        }
        div:nth-of-type(3){
            button{
                font-weight: 100;
            }
        }
    }
`;

export const ViewTicketController = styled.div`
    width: 90%;
    height: 500px;
    gap: .5rem;
`;

export const ChatLog = styled.div`
    width: 350px;
    height: inherit;
    background-color: aliceblue;
    border-radius: 10px;
`;