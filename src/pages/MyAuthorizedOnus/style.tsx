import styled from "styled-components";

export const Container = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
    min-height: calc(100vh - 62px);
`

export const HelpButton = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row-reverse;
    justify-content: space-between;
`

export const CardMyOnus = styled.div`
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: .5rem 0;
    background: #e6e3e3;
    border-radius: .6rem;

    .header{
        flex-direction: column;
        justify-content: flex-start;
        height: 60%;
        padding: 0.5rem 0;

        > div{
            p{
                margin: 0 .5rem;
                color: #2c2c2c;
            }

            @media (max-width: 420px){
                flex-direction: column;
                margin-top: .5rem;
            }
        }
    }
    .content{
        flex-direction: column;
        justify-content: flex-end;
        height: 40%;

        > div{
            width: 100%;
            margin-top: .5rem;
            padding-left: 1rem;
        }
    }
`

