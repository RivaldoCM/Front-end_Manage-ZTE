import styled from "styled-components";

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: .5rem 1rem 0 .5rem;

    .message {
        align-self: flex-end;
        background-color: #f9f9f9;
        border-radius: .5rem;
        padding: .5rem;
        margin-bottom: .5rem;
        width: 90%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

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
        color: #fff;
    }


    .divider {
        border-top: 1px solid #ddd;
        margin: 10px 0;
    }


    .content {
        font-size: .8rem;
        line-height: 1.4;
    }
`;

export const MessageOriginDepartmentTicket = styled.div`
    align-self: start;
    background-color: #444444 ;
    border-radius: .5rem;
    padding: .5rem;
    margin-bottom: .5rem;
    width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .sender{
        color: #ffffff;
    }

    .content{
        color: #fff
    }
`;

export const MessageDestinationDepartmentTicket = styled.div`
    align-self: end;
    background-color: #128C7E;
    border-radius: .5rem;
    padding: .5rem;
    margin-bottom: .5rem;
    width: 90%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .sender, .content{
        color: #ffffff ;
    }
`;