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
        <Option>Talla de calzado (Sí aplica)</Option>
        <Option>Mujer (NAL 35) = (USA 5- 5.5) = (EURO 36)</Option>
        <Option>Mujer (NAL 36) = (USA 6- 6.5) = (EURO 37)</Option>
        <Option>Mujer (NAL 37) = (USA 7- 7.5) = (EURO 38)</Option>
        <Option>Mujer (NAL 38-39) = (USA 8) = (EURO 39)</Option>
        <Option>Hombre (NAL 37) = (USA 7-7.5) = (EURO 40)</Option>
        <Option>Hombre (NAL 38) = (USA 8) = (EURO 41)</Option>
        <Option>Hombre (NAL 39-40) = (USA 8.5) = (EURO 42)</Option>
        <Option>Hombre (NAL 41) = (USA 9-9.5) = (EURO 43)</Option>
        <Option>Hombre (NAL 42) = (USA 10) = (EURO 44)</Option>
      </Select>
    </>
  );
}