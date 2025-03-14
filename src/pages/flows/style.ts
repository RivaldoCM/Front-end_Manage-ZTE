import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
    flex-direction: row-reverse;
    justify-content: space-between;

    aside{
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 20%;
        height: 100%;

        > div{
            width: 80%;
            height: 250px;
            border-left: 5px solid black;
            border-radius: .5rem;
            background: aliceblue;
        }
    }

    main{
        width: 80%;
        height: 98%;
        margin-left: 1rem;
        border: 3px solid black;
        border-radius:10px
    }
`;