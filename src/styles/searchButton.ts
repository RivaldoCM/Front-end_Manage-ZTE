import styled from "styled-components";

export const SearchButton = styled.div`
.search-container {
	text-align: center;

	.search-box {
		display: flex;
		max-width: 300px;
		margin: 0 auto;
		background-color: #f0f0f0; /* Fundo da barra de pesquisa */
		border-radius: 25px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.search-input {
		flex: 1;
		padding: 6px;
		border: none;
		outline: none;
		border-radius: 25px 0 0 25px;
		color: #333333; 
	}

	.search-button {
		background-color: #007bff;
		color: #ffffff;
		padding: 10px;
		cursor: pointer;
		border-radius: 0 25px 25px 0;
	}
}
`