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

export const AddClient = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    max-width: 406px;
    padding: .5rem;
    text-align: center;
    background: #fff;
    border-radius: 8px;

    .exitlag-alert{
        margin: 1rem 1.4rem;

        p{ text-align: left; }
    }
`