import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    .input-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 98%;
        max-width: 450px;
        height: 90%;
        border: 1px solid black;
        border-radius: 15px;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        
        .formHeader{
            height: 10%;
        }
        .formContent{
            width: 100%;
            height: 90%;

            .onu-callback{
                flex-direction: column;
                margin: 1rem 0;
                border: 1px solid black;
                border-radius: 10px;

                .info-onu-controller{
                    flex-direction: row;
                    width:100%;
                    border-bottom: 1px solid black;

                    .add-onu {

                        ul{
                            flex-direction: row;

                            li{
                                padding: .5rem;
                            }
                        }

                    }
                }

                .write-onu-controller{
                    width: 100%;
                    height: 100%;
                    background: #168821;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;

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
`;

export const SearchONU = styled.div`
    flex-direction: column;

    .option-container{
        width: 100%;
        margin: 1rem 0;
        justify-content: flex-start;

        :nth-of-type(2){
            align-items: end;
        }

        .text, .container{
            width: 50%;
        }
    }
`;