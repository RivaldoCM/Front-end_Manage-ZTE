import styled from 'styled-components';

export const ViewLogsClient = styled.div`
    width: 400px;
    height: 200px;
    padding: .5rem .5rem 1rem .5rem;
    background: #fff;
    border-radius: 10px;

    > div:first-child{
        flex-direction: column;
        align-items:flex-start;
        gap: 1.5rem;
        height: 85%;
        
        svg{
            margin-right: .5rem;
        }

        p{
            font-family: "Itim", cursive !important;
        }

    }
    > div:last-child{
        height: 15%;
        justify-content: flex-end;
    }

`;