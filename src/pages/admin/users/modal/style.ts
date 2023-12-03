import styled from "styled-components";

export const Container = styled.form`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	flex-direction: column;
	width: 98%;
	max-width: 580px;
    height: 100vh;
	max-height: 480px;
    background-color: white;
    border-radius: 30px;
	padding: 2rem 1rem;

	.container{
		position: relative;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
`;