import styled from "styled-components";

export const Controller = styled.div`
    width: 100vw;
    height:100vh;
    z-index: 9999;
`;

export const QRCodeContainer = styled.div`
    width: 250px;
    height:250px;
`

export const QRCodeResult = styled.div`
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
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
`;