import React from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox"; // Ajusta la ruta según tu estructura de carpetas

const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  margin-right: 20px; // Espaciado entre los elementos del carrusel
`;

const Carousel = ({ products }) => {
  return (
    <CarouselWrapper>
      {products.map((product) => (
        <CarouselItem key={product._id}>
          <ProductBox {...product} />
        </CarouselItem>
      ))}
    </CarouselWrapper>
  );
};

export default Carousel;