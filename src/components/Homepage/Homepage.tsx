

import styled from 'styled-components'
import { useState } from 'react'
import { ProductType } from '../../utils/type/type'
import Header from './Header/Header'
import Hero from './Header/Hero'
import Catalogue from './Catalogue/Catalogue'
// import Testimonials from './Testimonials/Testimonials'
// import FAQ from './FAQ/FAQ'
import Footer from './Footer/Footer'
// import BackToTop from '../Reusable-ui/BackToTop'
// import WhatsAppButton from '../Reusable-ui/WhatsAppButton'



export default function Homepage() {

  const [selectedProductForEdit, setSelectedProductForEdit] = useState<ProductType | null>(null);


  return (
    <>
      <Header selectedProductForEdit={selectedProductForEdit} setSelectedProductForEdit={setSelectedProductForEdit} />
      <AfterHeaderStyle>
        <Hero />
        <Catalogue setSelectedProductForEdit={setSelectedProductForEdit} />
        {/* <Testimonials /> */}
        {/* <FAQ /> */}
        <Footer />
      </AfterHeaderStyle>
      {/* <BackToTop /> */}
      {/* <WhatsAppButton /> */}
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