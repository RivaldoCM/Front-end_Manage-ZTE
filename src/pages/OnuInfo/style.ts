import styled from "styled-components";

export const DataField = styled.div`
    width: 95%;
    flex-direction: column;
    padding-bottom: 1rem;

    .basic-info{
        width: 80%;
        height: 40px;
        border-radius: 1rem 1rem 0 0;
        box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2);

        p{
            margin: 0 .5rem;
            font-family: "Itim", cursive !important;
            font-size: 1.1rem;
        }
    }
    .details{
        width: 100%;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        height: auto;
        padding: 1rem;

        .infos{
            height: 70%;
            p{
                font-family: "Itim", cursive !important;
                font-size: 1.1rem;
            }
        }
        .macs{
            height: 30%;
            div:last-child{

            }
        }
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const InfoStyle = styled.div`
    justify-content: space-around;
    width: 100%;
    margin: .5rem 0;
    padding: 0.4rem;
    border-radius: .8rem;
    background-color: #f3f3f3;
`

export const Macs = styled.div`
    flex-direction: column;
    justify-content: space-around;

    div:first-of-type{
        width: 100%;
        margin-bottom: .5rem;
        text-align: center;
    }

    .underlined{
        margin-bottom: .5rem;
        border-bottom: 2px solid #d6d6d6;
    }

    .table-wrapper{
        align-items: flex-start;
        width: 100%;

        .table-controller{
            width: 100%;
            height: 100%;
            max-height: 464px;
            overflow: auto;

            table{
                width: 100%;
                    th{
                    position: sticky;
                    top: 0;
                    background-color: #f1f1f1;
                    z-index: 1;
                }

                td{ text-align: center; background-color: #fff }

                th,td{
                    width: 4rem;
                    height: 1rem;
                    border: 2px solid #ccc;
                    padding: 8px;
                    border-radius: 4px;
                    transition: border-color 0.3s, background-color 0.3s;
                }
            }
        }
    }
`

export const Wireless = styled.div`
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    margin: .5rem 0;
    padding: 0.4rem;
    font-family: "Itim" !important;
    border-radius: .8rem;
    background-color: #f3f3f3;

    div:first-of-type{
        width: 100%;
        margin-bottom: .5rem;
        text-align: center;
    }

    .interface{
        flex-direction: column;
        width: 100%;
        padding: 0.4rem;
        border-radius: 0.8rem;
        background: #e0e0e0 !important;

        //TITULO
        div:first-of-type{
            width: 100%;
            margin-bottom: .5rem;
            text-align: start;
        }

        //CONTEUDO
        div:last-of-type{
            width: 90%;
        }
    }
`

export const Alarms = styled.div`
    flex-direction: column;

    .table-wrapper{
        align-items: flex-start;
        width: 100%;

        .table-controller{
            width: 100%;
            height: 100%;
            max-height: 464px;
            overflow: auto;

            table{
                width: 100%;

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
                    border: 2px solid #ccc;
                    padding: 8px;
                    border-radius: 4px;
                    transition: border-color 0.3s, background-color 0.3s;
                }
            }
        }
    }
`