import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .onu-callback{
        width: 100%;
        max-width: 480px;
        flex-direction: column;
        margin: 1rem 0;

        .info-onu-controller{
            flex-direction: row;
            width: 95%;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
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

            .dropdown-box{
                flex-direction: column;
                width: 100%;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
                border-radius: 1rem;

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

                form{
                    flex-direction: column;
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
`;

