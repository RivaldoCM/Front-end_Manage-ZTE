import styled from "styled-components";

export const Container = styled.div`
    flex-direction: column;

    .option-container{
        width: 100%;
        margin: 1rem 0;
        justify-content: flex-start;

        :nth-of-type(2){
            align-items: end;
        }

        .text, .container{
            width: 50%;
        }
    }
`;