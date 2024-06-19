import styled from "styled-components";

export const OltStyledContainer = styled.div`
    flex-direction: column;
    gap: .5rem 0;
    width: 100%;
    height: calc(100vh - var(--top-menu-size));
`;

export const BasicConfig = styled.div`
    flex-direction: column;
    width: inherit;
    height: 20%;
    background-color: yellow;
`;

export const AccessConfig = styled.div`
    flex-direction: column;
    width: 100%;
    height: 20%;
    background-color: blue;
`;

export const VlanConfig = styled.div`
    flex-direction: column;
    width: 100%;
    height: 60%;
    background-color: black;
`;