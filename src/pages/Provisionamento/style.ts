import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    align-items: center;
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