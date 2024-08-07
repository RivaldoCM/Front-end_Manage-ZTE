import styled from 'styled-components';

export const Form = styled.form`
    flex-direction: column;
    width: 100%;
    max-width: 720px;
    padding: 2rem;
    height: auto;

    .controller{
        display: flex;
        gap: .5rem;
        margin-bottom: .5rem;
        flex-wrap: wrap;
    }

    @media (max-width: 310px){
        .controller{
            div{
                width: 220px;
            }
        }
    }
`
