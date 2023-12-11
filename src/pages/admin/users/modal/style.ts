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

	.close-icon{
		width: 96%;
		height: 10%;
		justify-content: flex-end;
		align-items: end;
	}

	.content{
		position: relative;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 70%;
		width: 100%;
		padding: .5rem 2rem;
	}

	.button{
		width: 100%;
		height: 20%;
		align-items: start;
	}
`;