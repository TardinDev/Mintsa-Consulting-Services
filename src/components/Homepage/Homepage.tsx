

import styled from 'styled-components'
import Catalogue from './Catalogue/Catalogue'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Hero from './Header/Hero'
import { useState } from 'react'
import { ProductType } from '../../utils/type/type'



export default function Homepage() {

  const [selectedProductForEdit, setSelectedProductForEdit] = useState<ProductType | null>(null);

  
  return (
    <>
      <Header selectedProductForEdit={selectedProductForEdit} setSelectedProductForEdit={setSelectedProductForEdit} />
      <AfterHeaderStyle>
        <Hero />
        <Catalogue setSelectedProductForEdit={setSelectedProductForEdit} />
        <Footer />
      </AfterHeaderStyle>
    </>
  )
}



const AfterHeaderStyle = styled.div`
  padding-top: 120px; 

  @media (max-width: 768px) {
    padding-top: 140px;
  }

  @media (max-width: 480px) {
    padding-top: 100px;
  }
`;