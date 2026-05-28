import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import theme from "../../../utils/Theme/theme";
import { useUIStore } from "../../../stores";

function SearchContainer() {
  const { searchQuery, setSearchQuery } = useUIStore();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <SearchContainerStyle>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      <SearchInput
        type="search"
        placeholder="Rechercher un service, produit..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Rechercher un service ou produit"
      />
      {searchQuery && (
        <ClearButton onClick={handleClear} aria-label="Effacer la recherche">
          <FaTimes aria-hidden="true" />
        </ClearButton>
      )}
    </SearchContainerStyle>
  );
}

export default SearchContainer;

const SearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.gray100};
  border-radius: ${theme.borderRadius.lg};
  padding: 0.6rem 1.05rem;
  width: 100%;
  max-width: 480px;
  flex-shrink: 1;
  border: 1px solid ${theme.line};
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &:hover {
    border-color: ${theme.lineStrong};
  }

  &:focus-within {
    background: ${theme.gray200};
    border-color: ${theme.copperLine};
    box-shadow: 0 0 0 3px rgba(199, 123, 59, 0.08);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
    background: ${theme.gray200};
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.gray500};
  font-size: 0.88rem;
  margin-right: 0.6rem;
  transition: color 0.3s ease;

  ${SearchContainerStyle}:focus-within & {
    color: ${theme.primaryLight};
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  font-family: ${theme.fontBody};
  font-size: 0.9rem;
  color: ${theme.gray900};
  font-weight: 400;
  letter-spacing: 0.01em;

  &::placeholder {
    color: ${theme.gray500};
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`;

const ClearButton = styled.button`
  background: ${theme.gray300};
  color: ${theme.gray600};
  border: none;
  border-radius: ${theme.borderRadius.full};
  width: 22px;
  height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  margin-left: 0.5rem;

  &:hover {
    background: rgba(199, 123, 59, 0.18);
    color: ${theme.primaryLight};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 1px;
  }

  svg {
    font-size: 0.65rem;
  }
`;
