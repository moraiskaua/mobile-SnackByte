import Button from '../components/Button';
import Categories from '../components/Categories';
import Header from '../components/Header';
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
} from './styles';

const Main = () => {
  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer></MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          <Button onPress={() => {}}>Novo Pedido</Button>
        </FooterContainer>
      </Footer>
    </>
  );
};

export default Main;
