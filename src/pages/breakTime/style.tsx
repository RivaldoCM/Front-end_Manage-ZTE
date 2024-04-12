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
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin-top: 2rem;


    >div{
        margin-bottom: 1rem;
    }

    .break-times-container{
        flex-wrap: wrap;
    }
`

export const CardBreakTime = styled.div`
    width: 312px;
    height: auto;
    margin: 1rem;
    border-radius: 1rem;
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    box-shadow: -44px 38px 15px -3px rgba(0,0,0,0.1);

    div:first-child{
        flex-direction: column;
        width: 70%;

        div{
            width: 100%;
            height: calc(100%/2);
            padding: .2rem 0 .2rem .5rem;
            text-align: initial;
        }
    }

    div:last-child{
        flex-direction: column;
        justify-content: center;
        width: 30%;
        height: 100%;
        

        div{
            width: 100%;
            height: 50%;
        }
    }
`

export const TimerContainer = styled.div`
    width: calc(64px*6);
    height: 72px;
    border-top: ${(props) => (props.isBackDrop ? '1px solid grey' : 'none')};
    border-radius: 1rem;
    font-size: ${(props) => (props.isBackDrop ? '4rem' : '1rem')};
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