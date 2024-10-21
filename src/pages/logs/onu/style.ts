import styled from "styled-components";

export const Filter = styled.form`
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: auto;
    padding: 1rem;
`

export const FormFilter = styled.div`
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > div { margin: 0 .3rem; }
`

export const DateOptions = styled.div`
    padding-bottom: 8px; //ISSO EXISTE POIS OS DATE FIELDS TEM ESSE VALOR HERDADO DO MUI

`
export const ResponsiveTable = styled.div`
    overflow-x: auto;
`

export const FilterButtons = styled.div`

    > button {
        margin: .3rem;
    }
`

export const CollapseData = styled.div`
    width: 90%;
    height: 264px;
    padding: 1rem;

    aside{
        width: 20%;
        height: 100%;

        .card{
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            width: 200px;
            height: 100%;
            padding: .5rem;
            border: 1px solid black;
            border-radius: 10px;

            div{
                display: flex;
            }
        }
    }

`