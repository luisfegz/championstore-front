import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import CartShop from "./icons/CartShop";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
    position: relative;
    z-index: 3;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 767px) {
    display: ${props => props.$mobileNavActive ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #222;
    flex-direction: column;
  }
`;

const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    min-width: 30px;
    padding: 10px 0;
    @media screen and (min-width: 768px) {
        padding: 0;
        display: inline-flex;
    }
`;

const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border: 0;
    color: white;
     svg {
        width: 20px; // Tamaño base para escritorio
        height: 20px; // Tamaño base para escritorio
    }
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
        svg {
            width: 24px; // Tamaño ajustado para móviles
            height: 24px; // Tamaño ajustado para móviles
        }
    }
`;

const SideIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    a{
        display: inline-block;
        min-width: 20px;
        color: white;
        svg{
            width: 14px;
            height: 14px;
        }
    }
    Link{
        display: block;
        color: #aaa;
        text-decoration:none;
        min-width: 30px;
        padding: 0;
    }
`;

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                          <img src="/favicon.ico" alt="Champion Store Logo" style={{ height: '30px' }} /> 
                    </Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                    <SideIcons>
                        <NavLink href={'/cart'}>
                            <CartShop />({cartProducts.length})
                        </NavLink>
                        <Link href={'/search'}>
                            <SearchIcon />
                        </Link>
                        <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                            <BarsIcon />
                        </NavButton>
                    </SideIcons>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}
