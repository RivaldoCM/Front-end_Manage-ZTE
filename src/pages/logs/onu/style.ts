import styled from "styled-components";

export const Filter = styled.div`
    justify-content: start;
    width: 100%;
    height: 100px;
    padding: 1rem;
`

export const FormFilter = styled.form`
    margin-left: 1rem;
    justify-content: center;
    align-items: center;
    > div{
        padding-top: 8px; //ISSO EXISTE POIS OS DATE FIELDS TEM ESSE VALOR HERDADO DO MUI
        margin: 0 .3rem;
    }
`

export const FilterButtons = styled.div`

    > button {
        margin: .3rem;
    }
`