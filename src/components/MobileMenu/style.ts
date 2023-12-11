import styled from "styled-components";

export const Container = styled.div`
    flex-direction: column;
    width: 100%;

    header{
        justify-content: space-between;
        width: 100%;
        height: 56px;
        nav{
            height: inherit;
            .menu{
                width: 64px;
                height: inherit;
            }
        }

        .logout{
            height: 56px;
        }
    }
`;