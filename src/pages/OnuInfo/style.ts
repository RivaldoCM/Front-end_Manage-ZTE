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
    }
    .details{
        width: 100%;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
        border-radius: 1rem ;
        min-height: 310px;
    }
`;