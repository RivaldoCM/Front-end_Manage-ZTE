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
        white-space: break-spaces;
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

export const AutomaticMessages = styled.div`
    align-self: center;
    width: 90%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    border-left: 5px solid #ffb300;
    font-style: italic;
    color: #5d4037;
    background-color: #fff8e1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    > div:first-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        p{
            font-size: .9rem;
            font-weight: bold;
        }

        span{
            font-size: 0.9em;
            color: black;
        }
    }

    .divider {
        border-top: 1px solid #ddd;
        margin: 10px 0;
    }

    > div:last-of-type{
        font-size: .8rem;
        line-height: 1.4;
    }
`;