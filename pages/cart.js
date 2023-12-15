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

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country, cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  function getCartText() {
    let cartText = '';
    for (const product of products) {
      const quantity = cartProducts.filter(id => id === product._id).length;
      cartText += '- ' + product.title + ' (Cantidad: ' + quantity + ', Precio: ' + (quantity * product.price + ' mil COP') + ')%0a';
    }
    cartText += '%0a' + 'Total: $' + total + 'mil COP%0a';
    cartText += 'Domicilio 5mil COP (Sur de Cali) otras areas 7milCOP%0a';
    cartText += 'Domicilios a todo el País %0a';
    return cartText;
  }

  async function gotowhatsapp() {
    const nameValue = document.getElementById("name").value;
    const cityValue = document.getElementById("city").value;
    const postalCodeValue = document.getElementById("postalCode").value;
    const emailValue = document.getElementById("email").value;
    const streetAddressValue = document.getElementById("streetAddress").value;
    const countryValue = document.getElementById("country").value;
    const cartText = getCartText();

    const url = "https://wa.me/3023639624?text="
      + "Hola ¡Champion Store! Estos son mis datos de compra:" + "%0a"
      + "Nombre: " + nameValue + "%0a"
      + "Ciudad: " + cityValue + "%0a"
      + "Código postal: " + postalCodeValue + "%0a"
      + "Email: " + emailValue + "%0a"
      + "Dirección: " + streetAddressValue + "%0a"
      + "País: " + countryValue + "%0a%0a"
      + "Productos: " + "%0a" + cartText;

    window.open(url, '_blank').focus();
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

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
              {!cartProducts?.length && (
                <div>Your cart is empty</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.title}/>
                          </ProductImageBox>
                          {product.title}
                        </td>
                        <td>
                          <Button 
                            onClick={() => lessOfThisProduct(product._id)}
                          >-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button 
                            onClick={() => moreOfThisProduct(product._id)}
                          >+</Button>
                        </td>
                        <td>
                          ${cartProducts.filter(id => id === product._id).length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Order information</h2>
                <Input type="text"
                  id="name"
                  placeholder="Name" 
                  value={name}
                  name="name" 
                  onChange={ev => setName(ev.target.value)}/>
                <CityHolder>
                  <Input type="text"
                    id="city"
                    placeholder="City" 
                    value={city}
                    name="city" 
                    onChange={ev => setCity(ev.target.value)} />
                  <Input type="text"
                    id="postalCode"
                    placeholder="PostalCode" 
                    value={postalCode}
                    name="postalCode" 
                    onChange={ev => setPostalCode(ev.target.value)} />
                </CityHolder>
                <Input type="text"
                    id="email"
                    placeholder="Email"
                    value={email}
                    name="email" 
                    onChange={ev => setEmail(ev.target.value)}/>
                <Input type="text"
                  id="streetAddress"
                  placeholder="Street Address" 
                  value={streetAddress}
                  name="streetAddress" 
                  onChange={ev => setStreetAddress(ev.target.value)}/>
                <Input type="text"
                  id="country"
                  placeholder="Country" 
                  value={country}
                  name="country" 
                  onChange={ev => setCountry(ev.target.value)}/>
                <Button black
                  block
                  onClick={gotowhatsapp}>
                    Continue to payment
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
