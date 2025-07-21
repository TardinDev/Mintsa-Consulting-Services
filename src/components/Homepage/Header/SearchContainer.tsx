import styled from "styled-components";
import theme from "../../../utils/Theme/theme";



 function SearchContainer() {


  return (

    <SearchContainerStyle>

      <SearchInput type="text" placeholder="Rechercher" />
      <SearchButton>🔍</SearchButton>

    </SearchContainerStyle>
  )

}

export default SearchContainer;



const SearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.lightGrey};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 0.5rem;
  flex: 1;
  font-size: 1rem;
  color: ${theme.primary};

  &::placeholder {
    color: ${theme.secondary};
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: ${theme.primary};
  color: ${theme.white};
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e65c00;
  }
`;
