import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { HTMLAttributes, DetailedHTMLProps } from 'react';

interface MyStyledComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    center?: boolean;
}

export const GlobalStyle = createGlobalStyle`
    :root {
        --light-background: #F8FAFD;
        --blue: #029CF5;
        --dark-blue: #162BA9;
        --indigo: #5D8BF4;
        --light-blue: #5494CD;
        --maya: #91C6EE;
        
        --dark: #131516;
        --gray-700: #4A5568;
        --gray-600: #718096;
        --gray-500: #A0AEC0;
        --gray-400: #CBD5E0;
        --gray-300: #E2E8F0;
        --gray-200: #D4DDEA;
        --gray-100: #F5F7FA;

        --warning: #FFBA2F;
        --error: #F13636;
        --success: #00AC4F;

        --primary-color: var(--light-background);
        --secondary-color: var(--gray-500);
        --highlight-color: var(--blue);
        --background-color: var(--light-background);
        --text-color: var(--dark);
    }

    body.light-theme {
        --primary-color: var(--light-background);
        --secondary-color: var(--gray-200);
        --highlight-color: var(--blue);
        --background-color: var(--light-background);
        --text-color: var(--dark);
    }

    body.dark-theme {
        --primary-color: var(--dark);
        --secondary-color: var(--gray-700);
        --highlight-color: var(--dark-blue);
        --background-color: var(--dark);
        --text-color: var(--light-background);
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
        background: var(--background-color) !important;
        color: var(--text-color);
        -webkit-font-smoothing: antialiased;
    }

    body, button, textarea {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: 400;
    }

    p, li, input, div {
        font-family: 'Poppins', sans-serif !important;
    }

    h1, h2, h3, h4, h5, h6, strong, button {
        font-weight: 700;
        background: none;
    }

    button {
        cursor: pointer;
    }

    [disable] {
        opacity: 0.6%;
        cursor: not-allowed;
    }

    ::-webkit-scrollbar {
        width: 8px; /* Largura da barra de rolagem */
    }

    /* Track (trilha) */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; /* Cor de fundo da trilha */
    }

    /* Handle (alça) */
    ::-webkit-scrollbar-thumb {
        background: #bdbebd; /* Cor do fundo da alça */
        border-radius: 10px; /* Raio da borda da alça */
    }

    /* Handle on hover (alça ao passar o mouse) */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; /* Cor do fundo da alça ao passar o mouse */
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .MUI-CircularProgress {
        width: 30px !important;
        height: 30px !important;
    }

    .alert {
        position: fixed; 
        top: 94%;
        left: 50%;
        z-index: 100;
        transform: translate(-50%, -50%);
    }
`

export const InputContainer = styled.div<MyStyledComponentProps>`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 1rem 0;

    .text {
        display: flex;
        align-items: ${(props) => (props.center ? 'center' : 'end')};
    }

    .text, .content {
        width: 50%;
        padding: 0 2px;
    }

    .content {
        > input {
             //POR ALGUM MOTIVO O INPUT TYPE NUMBER FLOODA O MODAL
            max-width: 100%;
        }
    }

    @media (max-width: 450px){
        width: 100%;
    }
`
