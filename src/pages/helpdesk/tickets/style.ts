import styled from "styled-components";

export const Controller = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
    padding: 0 2rem;

    header{
        display: flex;
        justify-content: flex-end;
        width: inherit;
        height: 9%;
        padding: .5rem 0;
    }
    section:first-of-type{
        justify-content: space-between;
        width: inherit;
        height: 25%;
        padding: .5rem 0;
    }
    section:last-of-type{
        height: 66%;
        margin-bottom: .5rem;
        overflow: auto;
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