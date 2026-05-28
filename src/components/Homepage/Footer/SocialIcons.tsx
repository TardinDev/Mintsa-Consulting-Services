import styled from "styled-components";
import theme from "../../../utils/Theme/theme";

type SocialIconsType = {
  links: { icon: React.ReactNode; href: string; aria: string }[];
};

const SocialIcons: React.FC<SocialIconsType> = ({ links }) => (
  <IconsContainer>
    {links.map((link, index) => (
      <IconLink
        key={index}
        href={link.href}
        aria-label={link.aria}
        target={link.href.startsWith('http') ? '_blank' : undefined}
        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {link.icon}
      </IconLink>
    ))}
  </IconsContainer>
);

export default SocialIcons;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.gray600};
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  transition: all ${theme.transition.fast};

  &:hover {
    color: ${theme.primaryLight};
    border-color: ${theme.copperLine};
    background: rgba(199, 123, 59, 0.08);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
  }
`;
