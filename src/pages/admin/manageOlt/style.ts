import styled from "styled-components";

export const OltStyledContainer = styled.div`
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    padding: .5rem;
    height: calc(100vh - var(--top-menu-size));

    .title{
        position: absolute;
        top: 0;
        left: 0;
        margin-bottom: .5rem;

        p{
            text-decoration: underline;
        }
    }
`;

export const BasicConfig = styled.div`
    flex-direction: row;
    position: relative;
    width: inherit;
    height: 20%;
`;

export const AccessConfig = styled.div`
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 20%;

    .login-info{
        flex-direction: column;
        gap: .5rem;
        height: 100%;
        margin: 0 .5rem;
    }
`;

export const VlanConfig = styled.div`
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 60%;

`;