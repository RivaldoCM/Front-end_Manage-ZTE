import styled from "styled-components";

export const OltStyledContainer = styled.div`
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    padding: .5rem;
    height: auto;

    > div:first-child{
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .wrapper{
        flex-direction: row;
        align-items: flex-start;
        width: 100%;

        @media (max-width: 720px){
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-height: unset;
        }
    }
`;

export const InputsWrapper = styled.div`
    h4{
        margin-left: .8rem; 
    }
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    height: 100%;

    @media (max-width: 720px){
        width: 100%;
    }
`;

export const VlanConfig = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding-top: 1rem;
    max-height: calc(100vh - var(--top-menu-size));

    h3{
        width: 32%;
        text-align: center;
        border-bottom: 2px solid black;

        @media (max-width: 748px){
            width: 60%;
        }
    }

    > div:last-child{
        display: flex;
        width: inherit;
        height: inherit;
        align-items: flex-start;
        padding: 1rem;

        @media (max-width: 1214px){
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        aside{
            width: 40%;
            @media (max-width: 1214px){
                width: 60%;
            }

            @media (max-width: 748px){
                width: 80%;
            }

            @media (max-width: 552px){
                width:100%;
            }
            > form:first-child{
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                > div{
                    margin: 0 .5rem;
                }
            }

            .actions{
                flex-direction: column;
                align-items: flex-start;
                padding: 1rem;
                gap: 1rem;

                .form-wrapper{
                    flex-direction: column;
                    justify-content: flex-start;
                    width: 100%;
                    height: 7rem;
                    padding: .5rem;
                    border: 2px solid gray;
                    border-radius: 0.5rem;

                    > div{
                        width: 100%;
                        height: 20%;
                    }
                    form{
                        height: 80%;

                        > div{
                            margin: .5rem .5rem 0 0;
                        }
                    }
                }
            }
        
        }
    }

    .table-wrapper{
        align-items: flex-start;
        width: 100%;
        margin-top: 1rem;

        .table-controller{
            height: 80%;
            max-height: 464px;
            overflow: auto;

            th{
                position: sticky;
                top: 0;
                background-color: #f1f1f1;
                z-index: 1;
            }

            td{
                text-align: center;
            }

            th,td{
                width: 4rem;
                height: 1rem;
                border: 2px solid #ccc;
                padding: 8px;
                border-radius: 4px;
                transition: border-color 0.3s, background-color 0.3s;
            }

            td input{
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                transition: border-color 0.3s, background-color 0.3s;
            }

            td .vlans{
                width: 100px;
            }
        }
    }
`;

export const Inputs = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 1rem 0;


    .ip-validation{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        @media (max-width: 550px){
            justify-content: center;
            margin-left: 18.5px
        }

    }

    > div{
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 0 .5rem;

        @media (max-width: 1214px){
            width: 100%;
        }

        @media (max-width: 550px){
            justify-content: center;
        }

        > div{
            margin: .3rem;
        }
    }
`