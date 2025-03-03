import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 62px);

    .input-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;

        .formContent{
            width: 100%;
        }
    }
`;

export const Controller = styled.div`
    flex-direction: column;
    justify-content: flex-start !important;
    width: 100%;
    height: calc(100vh - 68px);
`

export const SIP = styled.div`
    width: 98%;
    margin: 0.5rem 0;
    border: 1px solid #e0e0e0;
    border-radius: 12px;

    .sip-header{
        justify-content: space-around;
        width: 100%;
        border-radius: 12px;
        background-color: #f1f1f1;
    }
    .input-sip{ padding: 0 1rem; }
`

export const Wifi = styled.div`
    width: 98%;
    margin: 0.5rem 0;
    border: 1px solid #e0e0e0;
    border-radius: 12px;

    .wifi-header{
        justify-content: space-around;
        width: 100%;
        border-radius: 12px;
        background-color: #f1f1f1;
    }
    .input-wifi{ margin: 0 .5rem; }

`;