import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import Button from '../Button';

interface CartProps {
  cartItem: CartItem[];
}

const Cart: React.FC<CartProps> = ({ cartItem }) => {
  return (
    <>
      {cartItem.length > 0 && (
        <FlatList
          data={cartItem}
          keyExtractor={cartItem => cartItem.product._id}
          style={{ marginBottom: 20, maxHeight: 150 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.98:8080/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity style={{ marginRight: 24 }}>
                  <MinusCircle />
                </TouchableOpacity>

                <TouchableOpacity>
                  <PlusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItem.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(120)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button disabled={cartItem.length === 0}>Confirmar pedido</Button>
      </Summary>
    </>
  );
};

export default Cart;
