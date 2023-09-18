import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;

    .input-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;

        .formContent{
            width: 100%;

            form{
                flex-direction: column;
                margin-bottom: 20px;

                .MUI-CircularProgress{
                    width: 30px !important;
                    height: 30px !important;
                }
            }
            .ONU-content{


                .onu-callback{
                    flex-direction: column;
                    margin: 1rem 0;

                    .info-onu-controller{
                        flex-direction: row;
                        width:95%;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                        border-radius: 1rem 1rem 0 0;

                        .add-onu {
                            width: 100%;

                            ul{
                                flex-direction: row;
                                flex-wrap: wrap;

                                li{
                                    padding: .5rem;
                                    font-size: .9rem;
                                }
                            }
                        }
                    }

                    .write-onu-controller{
                        width: 100%;
                        height: 100%;

                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

                        .dropdown-box{
                            flex-direction: column;
                            width: 100%;

                            .dropdown-header{
                                width: 100%;

                                > div {
                                    display: contents;

                                    p {
                                        font-size: .9rem;
                                    }
                                }
                            }

                            > div {
                                width: 100%;
                                //APLICA TAMANHO ONDE ESTÃO OS CAMPOS DE PPPoE E CONTRATO
                            }
                        }

                        .write-onu{
                            width: 100%;
                            height: 100%;
                            padding: .8rem;
                            color: white;
                        }
                    }
                }
            }
        }

        .alert{
            position: absolute;
            bottom:6%;
        }
    }
`;

export const InputContainer = styled.div`
    /*
        ESSE ESTILO CONTROLA O TEXTO E O QUE SEJA INSERIDO PELO USUÁRIO,
        CARACTERISTICO POR: INFORMAÇÃO EM TEXTO SOBRE O QUE DEVE SER INSERIDO
        E O CAMPO DE INSERÇÃO PARA O USUÁRIO
    */
    
    display: flex;
    justify-content: flex-start;
    width: 80%;
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
`;