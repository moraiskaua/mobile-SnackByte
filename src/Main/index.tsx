import { useState } from 'react';
import Menu from '../components/Menu';
import Button from '../components/Button';
import Categories from '../components/Categories';
import Header from '../components/Header';
import TableModal from '../components/TableModal';
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from './styles';
import Cart from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { ProductType } from '../types/Product';
import { ActivityIndicator } from 'react-native';

const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleResetOrder = () => {
    setSelectedTable('');
    setCartItems([]);
  };

  const handleAddToCart = (product: ProductType) => {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems(prev => {
      const itemIndex = prev.findIndex(
        cartItem => cartItem.product._id === product._id,
      );

      if (itemIndex < 0) {
        return prev.concat({ product, quantity: 1 });
      }

      const newCartItems = [...prev];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = { ...item, quantity: item.quantity + 1 };

      return newCartItems;
    });
  };

  const handleRemoveFromCart = (product: ProductType) => {
    setCartItems(prev => {
      const itemIndex = prev.findIndex(
        cartItem => cartItem.product._id === product._id,
      );
      const item = prev[itemIndex];
      const newCartItems = [...prev];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  };

  return (
    <>
      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />

      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {!isLoading ? (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            <MenuContainer>
              <Menu onAddToCart={handleAddToCart} />
            </MenuContainer>
          </>
        ) : (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable ? (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          ) : (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>
    </>
  );
};

export default Main;
