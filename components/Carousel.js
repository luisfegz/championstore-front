import React from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox"; // Adjust the path based on your folder structure

const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  margin-right: 20px; // Spacing between carousel items
`;

export default function Carousel({ products }) {
  return (
    <CarouselWrapper>
      {products.map((product) => (
        <CarouselItem key={product._id}>
          <ProductBox {...product} />
        </CarouselItem>
      ))}
    </CarouselWrapper>
  );
}
