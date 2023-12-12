import styled from 'styled-components'

export const NavBarStyle = styled.div`

    background-color: #d85000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    color: white;
`

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 0 .5rem;
    padding: 0 1rem;
    transition: transform 0.3s ease;
    

    :first-child{
        margin-left: 0;
    }
    span {
        margin-top: 5px;
        font-size: 12px;
    }

    :hover{
        >*{
        transform: scale(1.1);
        transform-origin: center;}
    }

`
