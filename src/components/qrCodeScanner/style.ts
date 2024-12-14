import styled from "styled-components";

export const Controller = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 60vh;
    background-color: white;
    z-index: 9999;

    > div:first-of-type{
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
    
`;