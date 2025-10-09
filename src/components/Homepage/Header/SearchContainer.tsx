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
        type="text"
        placeholder="Rechercher un service, produit..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <ClearButton onClick={handleClear}>
          <FaTimes />
        </ClearButton>
      )}
    </SearchContainerStyle>
  );
}

export default SearchContainer;

const SearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.full};
  padding: 0.75rem 1.25rem;
  width: 100%;
  max-width: 500px;
  flex-shrink: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all ${theme.transition.normal};

  &:focus-within {
    border-color: ${theme.primary};
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.primary};
  font-size: 1.1rem;
  margin-right: 0.75rem;
  transition: color ${theme.transition.fast};

  ${SearchContainerStyle}:focus-within & {
    color: ${theme.secondary};
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  font-size: 1rem;
  color: ${theme.gray800};
  font-weight: 500;

  &::placeholder {
    color: ${theme.gray400};
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`;

const ClearButton = styled.button`
  background: ${theme.gray200};
  color: ${theme.gray600};
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transition.fast};
  margin-left: 0.5rem;

  &:hover {
    background: ${theme.error};
    color: ${theme.white};
    transform: scale(1.1);
  }

  svg {
    font-size: 0.75rem;
  }
`;
