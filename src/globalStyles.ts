import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { HTMLAttributes, DetailedHTMLProps } from 'react';

interface MyStyledComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    center?: boolean;
}

export const GlobalStyle = createGlobalStyle`
    :root {
        //colors
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: none;
        border: 0;
        text-decoration: none;
        list-style-type: none;
    }
    html {
        font-size: 17px;

        @media screen {
            @media (max-width: 1000px){
                font-size: 93.75%; // 15px
            }
            @media (max-width: 720px){
                font-size: 87.5%; // 14px
            }
        }
    }
    body {
        //background: #bbbabb;
        -webkit-font-smoothing: antialiased;
    }
    body, button, texarea{
        font-family: 'Montserrat', sans-serif !important;
        font-weight: 400;
    }
    p, li, input, div{
        font-family: 'Poppins', sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6, strong, button{font-weight: 700; background: none;}
    button {cursor: pointer;}
    //a{color: var(--black)}
    [disable] {opacity: 0.6%; cursor: not-allowed;}

    .flex{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .MUI-CircularProgress{
        width: 30px !important;
        height: 30px !important;
    }

    .alert{
        position: fixed;
        bottom: 2%;
    }
`

export const InputContainer = styled.div<MyStyledComponentProps>`
    /*
        ESSE ESTILO CONTROLA O TEXTO E O QUE SEJA INSERIDO PELO USUÁRIO,
        CARACTERISTICO POR: INFORMAÇÃO EM TEXTO SOBRE O QUE DEVE SER INSERIDO
        E O CAMPO DE INSERÇÃO PARA O USUÁRIO
    */
    
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 1rem 0;

    @media (max-width: 450px){
        width: 100%;
    }

    .text{
        display: flex;
        align-items: ${(props) => (props.center ? 'center' : 'end')};
    }

    .text, .content{
        width: 50%;
        padding: 0 2px;
    }
`