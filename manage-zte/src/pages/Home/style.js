import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    form{
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
            height: 70%;
        }
        .formSubmit{
            height: 20%;
        }

    }
`;