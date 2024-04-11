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
    flex-direction: column;
    width: 86%;
    height: 92px;
    border-radius: .5rem;
    box-shadow: 32px 36px 15px -3px rgba(0,0,0,0.1);

    > div:first-child{
        width: 100%;
        border-bottom: 1px solid;
        text-align: center;
    }
`

export const ViewActiviesBreakTimes = styled.div`
    margin-top: 2rem;
    flex-direction: column;

    >div{
        margin-bottom: 1rem;
    }

    .teste{
        width: 186px;
        border: 1px solid black;
    }
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

export const ActionButton = styled.div`
    flex-direction: column;
    margin: 0.5rem;
    
    div{
        margin-top: 2%;
    }
`