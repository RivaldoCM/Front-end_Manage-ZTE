import styled from "styled-components";

export const SearchButton = styled.div`
.search-container {
	text-align: center;
	width: 240px;
	padding: 0 .5rem;
	.search-box {
		display: flex;
		width: 100%;
		margin: 0 auto;
		border-radius: .5rem;
		overflow: hidden;
        border: 2px solid #ccc;

		> input{ width: 80%; }
		> button{ width: 20%; }
	}

	.search-input {
		padding: .5rem;
		border: none;
		outline: none;
		border-radius: .5rem 0 0 .5rem;
	}

	.search-button {
		cursor: pointer;
		border-radius: 0 .5rem .5rem 0;
	}
}`