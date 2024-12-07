import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const AdminProductManagement: React.FC = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'add' | 'edit'>('add'); // Onglet actif

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <AccordionContainer isOpen={isAccordionOpen}>
      <AccordionHeader onClick={toggleAccordion}>
        {isAccordionOpen ? (
          <FaArrowRight size={20} color="#fff" />
        ) : (
          <FaArrowLeft size={20} color="#fff" />
        )}
      </AccordionHeader>

      <AccordionContent isOpen={isAccordionOpen}>
        <TabSwitcher>
          <Tab
            active={activeTab === 'add'}
            onClick={() => setActiveTab('add')}
          >
            Ajouter un Produit
          </Tab>
          <Tab
            active={activeTab === 'edit'}
            onClick={() => setActiveTab('edit')}
          >
            Modifier un produit
          </Tab>
        </TabSwitcher>

        {activeTab === 'add' && (
          <Form>
            <h3>Remplir le formulaire pour ajouter un nouveau produit</h3>
            <input type="text" placeholder="Nom du produit" />
            <input type="text" placeholder="Lien de l'image" />
            <input type="text" placeholder="Description" />
            <input type="number" placeholder="Prix" />
            <button type="button">Ajouter</button>
          </Form>
        )}

        {activeTab === 'edit' && (
          <Form>
            <h3>Clicker sur un produit du catalogue, puis modifier le</h3>
            <select>
              <option value="">Sélectionner un produit</option>
              <option value="1">Produit 1</option>
              <option value="2">Produit 2</option>
              <option value="3">Produit 3</option>
            </select>
            <input type="text" placeholder="Nom du produit" />
            <input type="text" placeholder="Lien de l'image" />
            <input type="text" placeholder="Description" />
            <input type="number" placeholder="Prix" />
            <button type="button">Modifier</button>
          </Form>
        )}
      </AccordionContent>
    </AccordionContainer>
  );
};

export default AdminProductManagement;

// Styled Components

const AccordionContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 20px;
  right: 0;
  z-index: 10;
  width: ${({ isOpen }) => (isOpen ? '400px' : '60px')};
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
  border: 1px solid rgba(200, 200, 200, 0.6);
  border-radius: 15px 0 0 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: width 0.6s ease;
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  background-color: #e65c00;
  padding: 10px;
  border-radius: 0 5px 5px 0;

  &:hover {
    opacity: 0.9;
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 20px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
    color: #e65c00;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const TabSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#ccc')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#bbb')};
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input, select {
    padding: 12px;
    border: 1px solid rgba(200, 200, 200, 0.6);
    border-radius: 10px;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    color: #333;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  button {
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      background-color: #004080;
    }
  }
`;
