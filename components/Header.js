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

const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: #aaa;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        <img src="/favicon.ico" alt="Champion Store Logo" style={{ height: '30px' }} />
                    </Logo>
                    <StyledNav $mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                    </StyledNav>
                    <SideIcons>
                        <Link href={'/search'} passHref>
                            <a><SearchIcon /></a>
                        </Link>
                        <Link href={'/cart'} passHref>
                            <a><CartShop />({cartProducts.length})</a>
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
