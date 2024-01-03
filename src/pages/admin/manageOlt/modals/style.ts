import styled from "styled-components";
 
export const DefaultStyledModal = styled.form`
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
    flex-direction: column;
    height: auto;
    padding: .5rem 0 1rem 0;
    background-color: white;
    border-radius: 30px;

`

export const CloseButton = styled.div`
    width: 98%;
    height: 10%;
    justify-content: flex-end;
    align-items: end;
`

export const FormModal = styled.div`
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 75%;
    padding: .5rem 2.5rem;
`

export const SubmitModal = styled.div`
    width: 100%;
    height: 15%;
    align-items: start;
`

export const AddOlt = styled.div`
	height: 100%;
`

export const deleteOlt = styled.div`

    
`

export const editOlt = styled.div`

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
		padding: .5rem 4rem;
	}

	.button{
		width: 100%;
		height: 20%;
		align-items: start;
	}
    
`