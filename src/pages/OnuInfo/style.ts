import styled from "styled-components";

export const DataField = styled.div`
    width: 95%;
    min-height: 350px;
    flex-direction: column;
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
        border-radius: 1rem ;
        min-height: 310px;

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
    width: 100%;
    margin: .5rem 0;
    padding: 0.4rem;
    border-radius: .8rem;
    background-color: #f3f3f3;

    div:first-of-type{
        width: 100%;
        margin-bottom: .5rem;
        text-align: center;
    }

    .underlined{
        margin-bottom: .5rem;
        border-bottom: 2px solid #d6d6d6;
    }
`

export const Wireless = styled.div`
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;
    width: 100%;
    margin: .5rem 0;
    padding: 0.4rem;

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