import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    flex-direction: column;
    user-select: none;

    form{
        display: grid;
        gap: 1.5rem;
        max-width: 500px;
        padding: 1rem;
    }
`;