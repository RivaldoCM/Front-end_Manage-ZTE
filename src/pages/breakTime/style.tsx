import styled from "styled-components";

export const BreakTimeContainer = styled.div`
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: calc(100 - 62px);
    padding: 2rem 0;
`;

export const BreakTimeOptions = styled.div`
    position: fixed;
    bottom: 2rem;
    width: 86%;
    height: 86px;
    border-radius: .5rem;

`

export const TimerContainer = styled.div`
    width: calc(64px*6);
    height: 72px;
    border-top: 1px solid grey;
    border-radius: 1rem;
    box-shadow: 17px 29px 15px -3px rgba(0,0,0,0.1);
`

export const TimerWrapper = styled.div`
    flex-direction: column;
    width: 128px;
    height: 100%;

    > p:first-of-type {
        font-size: 2rem;
    }

`