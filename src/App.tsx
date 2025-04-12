import ProductList from './components/ProductList/ProductList';
import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the E-commerce App</h1>
      <ProductList />
      {/* Add your components here */}
    </div>
  );
};

export default App;