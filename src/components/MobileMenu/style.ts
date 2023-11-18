import styled from "styled-components";

export const Container = styled.div`

    .float-menu{
        position: absolute;
        top: -1%;
        right: 2%;
        width: 64px;
        height: 56px;
        z-index: 10; //Para o menu sobrepor a tela gerada dinamicamente.
        .menu{
            width: inherit;
            height: inherit;
            border-radius: inherit;
        }
    }


`;