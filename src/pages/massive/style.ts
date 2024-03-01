import styled from "styled-components";

export const MassiveContainer = styled.div`
    width: 100%;
    height: inherit;
`
export const Cards = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 4rem 5vw;
    padding: 0;
    list-style-type: none;
`

export const Card = styled.div`
    position: relative;
    display: block;
    height: 100%;  
    border-radius: calc(var(--curve) * 1px);
    overflow: hidden;
    text-decoration: none;

    > :hover .card__overlay, > :hover .card__header{
        transform: translateY(0);
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
        }
    }
`

