import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import theme from "../../../utils/Theme/theme";
import { useUIStore } from "../../../stores";

function SearchContainer() {
  const { searchQuery, setSearchQuery } = useUIStore();

  const handleClear = () => {
    setSearchQuery('');
  };

  const scrollToResults = () => {
    const target = document.querySelector('#catalogue');
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SearchContainerStyle
      role="search"
      onSubmit={(e) => { e.preventDefault(); scrollToResults(); }}
    >
      <SearchIcon aria-hidden="true">
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
        <ClearButton type="button" onClick={handleClear} aria-label="Effacer la recherche">
          <FaTimes aria-hidden="true" />
        </ClearButton>
      )}
      <SubmitButton type="submit" aria-label="Lancer la recherche">
        <FaSearch aria-hidden="true" />
      </SubmitButton>
    </SearchContainerStyle>
  );
}

export default SearchContainer;

const SearchContainerStyle = styled.form`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  background: ${theme.gray100};
  border-radius: ${theme.borderRadius.full};
  padding: 0.32rem 0.34rem 0.32rem 1.15rem;
  width: 100%;
  max-width: 480px;
  flex-shrink: 1;
  border: 1px solid ${theme.line};
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &:hover {
    border-color: ${theme.lineStrong};
    background: ${theme.gray200};
  }

  &:focus-within {
    background: ${theme.gray200};
    border-color: ${theme.copperLine};
    box-shadow: 0 0 0 4px rgba(240, 144, 30, 0.1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
    background: ${theme.gray200};
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.gray500};
  font-size: 0.85rem;
  flex-shrink: 0;
  transition: color 0.3s ease;

  ${SearchContainerStyle}:focus-within & {
    color: ${theme.primaryLight};
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  padding: 0.45rem 0;
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

  /* masque la croix native du type=search (on a notre ClearButton) */
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: ${theme.gray500};
  border: none;
  border-radius: ${theme.borderRadius.full};
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &:hover {
    background: rgba(240, 144, 30, 0.14);
    color: ${theme.primaryLight};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 1px;
  }

  svg { font-size: 0.7rem; }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.gradientGold};
  color: ${theme.black};
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(240, 144, 30, 0.28);
  transition: all 0.4s ${'cubic-bezier(0.34, 1.4, 0.64, 1)'};

  svg { font-size: 0.82rem; }

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 4px 18px rgba(240, 144, 30, 0.42);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primaryLight};
    outline-offset: 2px;
  }
`;
