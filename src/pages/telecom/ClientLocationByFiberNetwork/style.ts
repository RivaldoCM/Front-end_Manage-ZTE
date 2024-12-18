import styled from "styled-components";

export const Mobile = styled.div`
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
`;

export const Desktop = styled.div`
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
`;

export const Controller = styled.div`
    width: 100%;
    height:100dvh;
    z-index: 9999;
`;

export const QRCodeResult = styled.div`
    flex-direction: column;
    justify-content: space-around;
    width: 346px;
    height: auto;
    min-height: 250px;
    margin: 2rem;
    padding: .5rem 0;
    border-radius: 2rem;
    background: rgba(109, 109, 110, 0.9);

    h1,p{
        color: white;
        white-space: break-spaces;
    }

    form{
        flex-direction: column;
        > div{
            margin: .5rem 0;
        }
    }
`;