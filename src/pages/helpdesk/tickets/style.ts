import styled from "styled-components";

export const Controller = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    header{
        display: flex;
        justify-content: flex-end;
        width: inherit;
        padding: .5rem;
    }
    section{
        justify-content: space-around;
        width: inherit;
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