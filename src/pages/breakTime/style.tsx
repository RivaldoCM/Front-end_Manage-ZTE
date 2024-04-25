import styled from "styled-components";

interface StyledBackGround {
    isBackDrop?: boolean;
}

export const BreakTimeContainer = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    min-height: calc(100vh - 68px);
    user-select: none;
`;

export const BreakTimeOptions = styled.div`
    flex-direction: column;
    width: 85%;
    height: 98px;
    margin-top: .5rem;
    border-radius: .5rem;
    box-shadow: 32px 36px 15px -3px rgba(0,0,0,0.1);

    > div:first-child{
        width: 100%;
        text-align: center;
    }
`

export const ViewActiviesBreakTimes = styled.div<StyledBackGround>`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    width: 100%;
    margin-top: 2rem;
    filter: ${(props) => (props.isBackDrop ? 'blur(5px)' : 'none')};

    > div{
        margin-bottom: 1rem;
    }

    .break-times-container{
        flex-wrap: wrap;
    }
`

export const CardBreakTime = styled.div`
    width: 348px;
    height: 124px;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    border:2px solid grey;

    div:first-child{
        flex-direction: column;
        width: 70%;
        overflow: auto;

        div{
            width: 100%;
            height: auto;
            padding: .2rem 0 .2rem .5rem;
            text-align: initial;

            p{
                max-width: 100%;
                overflow: hidden;
            }
        }
    }

    div:last-child{
        flex-direction: column;
        justify-content: center;
        width: 30%;

        div{
            width: 100%;
            height: 50%;
        }
    }
`

export const TimerContainer = styled.div<StyledBackGround>`
    flex-direction: column;
    width: calc(64px*6);
    margin: 1rem 0;
    border-top: ${(props) => (props.isBackDrop ? '5px solid #393939' : 'none')};
    border-bottom: ${(props) => (props.isBackDrop ? '5px solid #393939' : 'none')};
    border-radius: 1rem;
    font-size: ${(props) => (props.isBackDrop ? '4rem' : '1rem')};

    p:nth-child(2){
        font-size: 1rem;
        color: #ff00007a;
    }
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

export const Panel = styled.div`
    flex-wrap: wrap;
`

export const Dashboard = styled.div`
    width: calc(100vw - 65px);
    main{
        width: 70%;
    }
    aside{
        flex-direction: column;
        width: 30%;
    }
`