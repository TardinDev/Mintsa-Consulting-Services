import React from 'react';
import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';

type FooterSectionType = {
  title: string;
  children: React.ReactNode;
};

const FooterSection: React.FC<FooterSectionType> = ({ title, children }) => (
  <SectionContainer>
    <h3>{title}</h3>
    {children}
  </SectionContainer>
);

export default FooterSection;

const SectionContainer = styled.div`
  margin: 20px;
  flex: 1;
  min-width: 200px;

  h3 {
    color: ${theme.blue};
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin: 8px 0;
  }

  p, a {
    color: ${theme.white};
  }

  a:hover {
    text-decoration: underline;
  }
`;