import styled from 'styled-components';
import { useState } from 'react';
import { ProductType } from '../../utils/type/type';
import dataProduct from '../../utils/data/dataProducts'


const Admin = () => {
  const [products, setProducts] = useState<ProductType[]>(dataProduct);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, images: [''] });

  // Supprimer un produit
  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // Ajouter un produit
  const handleAdd = () => {
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const product: ProductType = { 
      ...newProduct, 
      id,
      status: 'disponible',
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: 0, images: [''] });
  };

  return (
    <AdminContainer>
      <h1>Admin Dashboard</h1>

      <h2>Ajouter un produit</h2>
      <Form>
        <input
          type="text"
          placeholder="Nom du produit"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prix"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Lien de l'image"
          value={newProduct.images[0]}
          onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </Form>

      <h2>Produits existants</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default Admin;
// Styles
const AdminContainer = styled.div`
  padding: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  button {
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #e60000;
    }
  }
`;
