import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import Footer from "@/components/Footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const DOMICILIO_CALI = 5000;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function formatPrice(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const product = products.find(p => p._id === productId);
    const quantity = cartProducts.filter(id => id === productId).length;
    if (product) {
      total += quantity * product.price;
    }
  }

  const shippingCost = city === 'Cali' ? DOMICILIO_CALI : 7000;
  total += shippingCost;

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Cart</h2>
              {!cartProducts.length && <div>Your cart is empty</div>}
              {products.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                                            <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => {
                      const quantity = cartProducts.filter(id => id === product._id).length;
                      return (
                        <tr key={product._id}>
                          <td>
                            <ProductImageBox>
                              <img src={product.images[0]} alt={product.title}/>
                            </ProductImageBox>
                            {product.title}
                          </td>
                          <td>
                            <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                            <QuantityLabel>{quantity}</QuantityLabel>
                            <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                          </td>
                          <td>
                            ${formatPrice(quantity * product.price)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td>Total:</td>
                      <td>${formatPrice(total)}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {cartProducts.length > 0 && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Order information</h2>
                <Input type="text" id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <CityHolder>
                  <Input type="text" id="city" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                  <Input type="text" id="postalCode" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </CityHolder>
                <Input type="text" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="text" id="streetAddress" placeholder="Street Address" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                <Input type="text" id="country" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
                <Button onClick={() => {/* Logic to handle order submission */}}>
                  Continue to WhatsApp Order
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}