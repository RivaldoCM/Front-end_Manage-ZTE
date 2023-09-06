import { createGlobalStyle } from "styled-components";

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
        font-size: 18px;

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
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }
    body, button, texarea, input {
        font-family: 'Josefin Sans', sans-serif;
        font-weight: 400;
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

`