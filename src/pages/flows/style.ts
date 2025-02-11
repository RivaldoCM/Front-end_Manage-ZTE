import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
    flex-direction: row-reverse;
    justify-content: space-between;

    aside{
        width: 15%;
        height: 100%;
        align-items: flex-start;
    }

    > div:first-of-type{
        width: 85%;
        height: 100%;
        border: 3px solid black;
        border-radius:10px
    }
`;