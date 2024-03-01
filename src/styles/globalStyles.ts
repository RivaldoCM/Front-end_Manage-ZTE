import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { HTMLAttributes, DetailedHTMLProps } from 'react';

interface MyStyledComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    center?: boolean;
}

export const GlobalStyle = createGlobalStyle`
    :root {
        //colors
        --surface-color: #fff;
        --curve: 40;
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
        //background: #eef1f6 !important;
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
        top: 94%;
        left:50%;
        z-index: 100;
        transform: translate(-50%, -50%);
    }

    .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 4rem 5vw;
    padding: 0;
    list-style-type: none;
}
  
.card {
position: relative;
display: block;
height: 100%;  
border-radius: calc(var(--curve) * 1px);
overflow: hidden;
text-decoration: none;
}
  
  .card__image {      
    width: 100%;
    height: auto;
  }
  
  .card__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;      
    border-radius: calc(var(--curve) * 1px);    
    background-color: var(--surface-color);      
    transform: translateY(100%);
    transition: .2s ease-in-out;
  }
  
  .card:hover .card__overlay {
    transform: translateY(0);
  }
  
  .card__header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 2em;
    border-radius: calc(var(--curve) * 1px) 0 0 0;    
    background-color: var(--surface-color);
    transform: translateY(-100%);
    transition: .2s ease-in-out;
  }
  
  .card__arc {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 100%;
    right: 0;      
    z-index: 1;
  }
  
  .card__arc path {
    fill: var(--surface-color);
    d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
  }       
  
  .card:hover .card__header {
    transform: translateY(0);
  }
  
  .card__thumb {
    flex-shrink: 0;
    width: 50px;
    height: 50px;      
    border-radius: 50%;      
  }
  
  .card__title {
    font-size: 1em;
    margin: 0 0 .3em;
    color: #6A515E;
  }
  
  .card__tagline {
    display: block;
    margin: 1em 0;
    font-family: "MockFlowFont";  
    font-size: .8em; 
    color: #D7BDCA;  
  }
  
  .card__status {
    font-size: .8em;
    color: #D7BDCA;
  }
  
  .card__description {
    padding: 0 2em 2em;
    margin: 0;
    color: #D7BDCA;
    font-family: "MockFlowFont";   
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
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

    .text{
        display: flex;
        align-items: ${(props) => (props.center ? 'center' : 'end')};
    }

    .text, .content{
        width: 50%;
        padding: 0 2px;
    }

    .content{

        > input{
            //POR ALGUM MOIVO O INPUT TYPE NUMBER FLOODA O MODAL
            max-width: 100%;
        }
    }
    

    @media (max-width: 450px){
        width: 100%;
    }
`