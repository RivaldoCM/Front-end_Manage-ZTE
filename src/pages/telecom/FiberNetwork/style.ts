import styled from "styled-components";

export const TableController = styled.div`

`;

export const AddModal = styled.div`
    padding: .5rem;

    > div:nth-child(1){
        display: flex;
        justify-content: space-between;
        margin-bottom: .5rem;
    }

    >div:nth-child(4){
        display: flex;
        flex-direction: column;
        margin: .5rem 0;

        > div {
            justify-content: flex-start;
        }
    }

    > button:last-child {
        margin-top: .5rem;
        width: 100%;
    }
`;
