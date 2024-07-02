import styled from "styled-components";

export const OltStyledContainer = styled.div`
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    padding: .5rem;
    height: auto;

    .wrapper{
        flex-direction: row;
        width: 100%;
        max-height: 50vh;
    }
`;

export const BasicConfig = styled.div`
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: 100%;
`;

export const AccessConfig = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

export const VlanConfig = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - var(--top-menu-size));

    > div:last-child{
        display: flex;
        width: inherit;
        height: inherit;
        align-items: flex-start;
        padding: 1rem;

        aside{
            width: 40%;

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

                form{
                    width: 100%;
                    padding: .5rem;
                    margin: 0.5rem 0;
                    border: 2px solid gray;
                    border-radius: 0.5rem;


                    > div{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        >div{
                            margin: 0 .5rem;
                        }
                    }
                }
            }
        
        }
    }

    .form-wrapper{
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }

    .table-wrapper{
        width: 100%;
        height: 100%;
        overflow: auto;

        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        th, td{
            padding: 15px;
        }
    }
`;

export const Title = styled.div`
    width: 100%;
`

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 1rem 0;

    > div{
        margin: 0 .5rem;

        > div{
            margin: .3rem;
        }
    }
`