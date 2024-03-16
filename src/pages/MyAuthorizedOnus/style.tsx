import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 1rem;
    min-height: 100vh;
`

export const HelpButton = styled.div`
    width: 100%;
    height: auto;
    justify-content: flex-end;
    align-items: flex-end;

`

export const CardMyOnus = styled.div`
    width: 100%;
    height: 150px;
    margin: .5rem 0;
    background: #e6e3e3;
    border-radius: .6rem;

    .header{
        height: 60%;
        justify-content: flex-start;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 0.5rem 0;

        p{
            margin: 0 .5rem;
            color: #2c2c2c;
        }
    }
    .content{
        height: 40%;
    }
`

