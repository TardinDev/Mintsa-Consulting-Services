import styled from "styled-components";

type SocialIconsType = {
    links: { icon: React.ReactNode; href: string; aria: string }[];
  }
  
  const SocialIcons: React.FC<SocialIconsType> = ({ links }) => (
    <IconsContainer>
      {links.map((link, index) => (
        <a key={index} href={link.href} aria-label={link.aria}>
          {link.icon}
        </a>
      ))}
    </IconsContainer>
  );


  export default SocialIcons;
  
  const IconsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
  
    a {
      font-size: 1.2em;
      transition: color 0.3s;
    }
  
    a:hover {
      color: #0056b3;
    }
  `;