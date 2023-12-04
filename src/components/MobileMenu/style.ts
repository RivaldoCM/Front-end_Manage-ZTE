import styled from "styled-components";

export const Container = styled.div`
    flex-direction: column;
    width: 100%;

    .float-menu{
        align-self: end;
        width: 64px;
        height: 56px;
        .menu{
            width: inherit;
            height: inherit;
            border-radius: inherit;
        }
    }
`;