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
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
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
const DOMICILIO_CALI = 6500;
const DOMICILIO_OTRAS_CIUDADES = 20000;
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
      axios.post('/api/cart', { ids: cartProducts }).then(response => {
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
    if (window.location.href.includes('success')) {
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
  function formatPrice(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country, cartProducts,
    });
    if (response.data.url) {
      window.location.href = response.data.url;
    }
  }
  function getCartText() {
    let cartText = products.map(product => {
      const quantity = cartProducts.filter(id => id === product._id).length;
      return `- ${product.title} (Cantidad: ${quantity}, Precio: ${formatPrice(quantity * product.price)} COP)`;
    }).join("%0a");

    let shippingCost = city === 'Cali' ? DOMICILIO_CALI : DOMICILIO_OTRAS_CIUDADES;
    cartText += `%0a%0aTotal: $${formatPrice(total + shippingCost)} COP`;
    cartText += `%0aDomicilio: $${formatPrice(shippingCost)} COP`;
    cartText += `%0aDomicilio: $${formatPrice(shippingCost)} COP`;
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
    const streetAddressEncoded = encodeURIComponent(streetAddressValue);
    const message = [
        "Hola ¡Champion Store! Estos son mis datos de compra:",
        `Nombre: ${nameValue}`,
        `Ciudad: ${cityValue}`,
        `Código postal: ${postalCodeValue}`,
        `Email: ${emailValue}`,
        `Dirección: ${streetAddressEncoded}`,
        `País: ${countryValue}`,
        "",
        "Productos:",
        cartText
    ].join("%0a");
    const url = `https://wa.me/3023639624?text=${message}`;
  
    window.open(url, '_blank').focus();
  }
  let total = 0;
  products.forEach(product => {
    const quantity = cartProducts.filter(id => id === product._id).length;
    total += quantity * product.price;
  });
  
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
                              <img src={product.images[0]} alt={product.title} />
                            </ProductImageBox>
                            {product.title}
                          </td>
                          <td>
                            <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                            <QuantityLabel>{quantity}</QuantityLabel>
                            <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                          </td>
                          <td>${formatPrice(quantity * product.price)}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Total: ${formatPrice(total)}</td>
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
                <Button black block onClick={gotowhatsapp}>Continue to payment</Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
