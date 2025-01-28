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

export const ViewTicketController = styled.div`
    height: 500px;
    gap: .5rem;
`;

export const ViewTicketStyle = styled.div`
    width: 90dvw;
    max-width: 768px;
    height: inherit;
    padding: 1rem;
    border-radius: 10px;
    background-color: aliceblue;

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

export const ChatLog = styled.aside`
    width: 350px;
    height: inherit;
    padding: 0.5rem;
    background-color: aliceblue;
    border-radius: 10px;

    header{
        position: relative;
        display: flex;
        width: 100%;
        height: 10%;
        justify-content: space-between;
    }

    > div{
        display: flex;
        width: 100%;
        flex-direction: column;
        height: 70%;
        padding-top: .5rem;
        overflow: scroll;

        .message {
            align-self: flex-end;
            background-color: #f9f9f9;
            border-radius: .5rem;
            padding: .5rem;
            margin-bottom: .5rem;
            width: 90%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Cabeçalho com nome do remetente e horário */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .sender {
            font-size: .9rem;
            font-weight: bold;
        }

        .timestamp {
            font-size: 0.9em;
            color: #777;
        }

        /* Linha divisória */
        .divider {
            border-top: 1px solid #ddd;
            margin: 10px 0;
        }

        /* Conteúdo da mensagem */
        .content {
            font-size: .8rem;
            line-height: 1.4;
        }
    }

    footer{
        height: 20%;
    }
`;

export const MessageOriginDepartmentTicket = styled.div`
    align-self: start;
    background-color: #87CEFA;
    border-radius: .5rem;
    padding: .5rem;
    margin-bottom: .5rem;
    width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .sender{
        color: #333333
    }

    .content{
        color: #fff
    }

`;

export const MessageDestinationDepartmentTicket = styled.div`
    align-self: end;
    background-color: #B2E0C7;
    border-radius: .5rem;
    padding: .5rem;
    margin-bottom: .5rem;
    width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .sender{
        color: #ffffff !important;
    }

    .content{
        color:rgb(39, 39, 39)
    }
`;