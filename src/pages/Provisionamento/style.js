import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;

    .input-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;

        .formContent{
            width: 100%;
        }

        .alert{
            position: fixed;
            bottom: 2%;
        }
    }
`;