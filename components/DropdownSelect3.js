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
        <Option>Talla de prenda inferior (Sí aplica)</Option>
        <Option>Mujer (NAL S-32) = (USA S) = (68-73 CM)</Option>
        <Option>Mujer (NAL M-34) = (USA M) = (73-78 CM)</Option>
        <Option>Mujer (NAL L-36) = (USA L) = (78-83 CM)</Option>
        <Option>Mujer (NAL XL-38) = (USA XL) = (83-88 CM)</Option>
        <Option>Hombre (NAL S-32) = (USA S) = (68-73 CM)</Option>
        <Option>Hombre (NAL M-34) = (USA M) = (73-78 CM)</Option>
        <Option>Hombre (NAL L-36) = (USA L) = (78-83 CM)</Option>
        <Option>Hombre (NAL XL-38) = (USA XL) = (83-88 CM)</Option>
      </Select>
    </>
  );
}