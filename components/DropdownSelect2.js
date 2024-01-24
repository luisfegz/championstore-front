import React, { useState } from "react";
import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  margin-bottom: 8px;
  padding: 5px 5px;
  border-radius: 5px;
  border: 0.1px solid #b5bac9;
`;

const Option = styled.option`
  width: 800%;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 5px 5px;
  border-radius: 5px;
`;

export default function DropdownSelect({ setSelectedOption }) {
  const [selectedOptionLocal, setSelectedOptionLocal] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOptionLocal(event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Select onChange={handleSelectChange} value={selectedOptionLocal}>
        <Option>Talla de prenda superior (Sí aplica)</Option>
        <Option>Mujer S</Option>
        <Option>Mujer M</Option>
        <Option>Mujer L</Option>
        <Option>Mujer XL</Option>
        <Option>Hombre S</Option>
        <Option>Hombre M</Option>
        <Option>Hombre L</Option>
        <Option>Hombre XL</Option>
        <Option>Hombre XXL</Option>
      </Select>
    </>
  );
}