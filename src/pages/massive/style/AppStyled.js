import styled from 'styled-components';

export const AppContainer = styled.div`
    text-align: center;
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1;
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
`