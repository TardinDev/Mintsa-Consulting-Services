

import styled from 'styled-components'
import { AdminModeProvider } from '../../context/AdminModeContext'
import Catalogue from './Catalogue/Catalogue'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Hero from './Header/Hero'
import { useState } from 'react'
import { ProductType } from '../../utils/type/type'



export default function Homepage() {

  const [selectedProductForEdit, setSelectedProductForEdit] = useState<ProductType | null>(null);

  
  return (

   <AdminModeProvider>
     <Header selectedProductForEdit={selectedProductForEdit} setSelectedProductForEdit={setSelectedProductForEdit} />
     <AfterHeaderStyle>
       <Hero />
       <Catalogue setSelectedProductForEdit={setSelectedProductForEdit} />
       <Footer />
     </AfterHeaderStyle>
    
   </AdminModeProvider>
  
  )
}



const AfterHeaderStyle = styled.div`
  padding-top: 130px; 

`;