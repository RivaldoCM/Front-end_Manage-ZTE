import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 62px);

    .input-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;

        .formContent{
            width: 100%;
        }
    }
`;

export const Controller = styled.div`
    flex-direction: column;
    justify-content: flex-start !important;
    width: 100%;
    height: calc(100vh - 68px);
`