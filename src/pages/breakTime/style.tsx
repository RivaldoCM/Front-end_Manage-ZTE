import styled from "styled-components";

export const BreakTimeContainer = styled.div`
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: calc(100 - 62px);
    padding: 2rem 0;
    user-select: none;
`;

export const BreakTimeOptions = styled.div`
    width: 86%;
    height: 86px;
    border-radius: .5rem;
    box-shadow: 32px 36px 15px -3px rgba(0,0,0,0.1);

`

export const TimerContainer = styled.div`
    width: calc(64px*6);
    height: 72px;
    border-top: 1px solid grey;
    border-radius: 1rem;
    font-size: 4rem;
`

export const BackDrop = styled.div`
    flex-direction: column;

`