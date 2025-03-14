import styled from "styled-components";

export const CardFlow = styled.button`
    width: 200px;
    height: 200px;
    background: rgba(98, 80, 143, 0.06);

    div:nth-child(1){
        height: 70%;

        .img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid black;
        }
    }
    div:nth-child(2){
        height: 30%;
        border: 2px solid black;
        border-radius: 0 .5rem;
    }

`;