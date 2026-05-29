import styled from 'styled-components'
import { useState } from 'react'
import { ProductType } from '../../utils/type/type'
import Header from './Header/Header'
import Hero from './Header/Hero'
import Catalogue from './Catalogue/Catalogue'
import Testimonials from './Testimonials/Testimonials'
import FAQ from './FAQ/FAQ'
import Footer from './Footer/Footer'
import BackToTop from '../Reusable-ui/BackToTop'
import WhatsAppButton from '../Reusable-ui/WhatsAppButton'
import SEOHead from '../SEOHead'

export default function Homepage() {
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<ProductType | null>(null);

  return (
    <>
      <SEOHead
        title="Accueil"
        description="MINTSA Services Consulting - Votre partenaire d'excellence au Gabon pour les services administratifs, fiscaux, automobiles et immobiliers."
      />
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      <Header selectedProductForEdit={selectedProductForEdit} setSelectedProductForEdit={setSelectedProductForEdit} />
      <AfterHeaderStyle>
        <Hero />
        <main id="main-content" role="main">
          <Catalogue setSelectedProductForEdit={setSelectedProductForEdit} />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </AfterHeaderStyle>
      <BackToTop />
      <WhatsAppButton />
    </>
  )
}

const AfterHeaderStyle = styled.div``;
