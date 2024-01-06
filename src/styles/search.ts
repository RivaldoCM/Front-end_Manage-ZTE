import styled from "styled-components";

export const SearchButton = styled.div`
.search-container {
  text-align: center;
}

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
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 25px 0 0 25px;
  color: #333333; /* Texto de entrada */
}

.search-button {
  background-color: #007bff; /* Botão de pesquisa */
  color: #ffffff; /* Cor do texto no botão */
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0 25px 25px 0;
}

.search-button i {
  margin-right: 5px;
  color: black; /* Cor do ícone de pesquisa */
}

`