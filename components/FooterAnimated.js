import styled, { css, keyframes } from "styled-components";
import Script from 'next/script';

const AnimatedFooter = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const FFooter = styled.footer`
    position: relative;
    background: #3586ff;
    min-height: 100px;
    padding: 20px 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
        justify-content: center;
        color: #fff;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
`;

const SocialIcon = styled.ul`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
    li {
        list-style: none;
    }
    li a {
        font-size: 2em;
        color: #fff;
        margin: 0 10px;
        display: inline-block;
        transition: 0.5s;
    }
    li a:hover {
        transform: translateY(-10px);
    }
`;

const Menu = styled.ul`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
    li {
        list-style: none;
    }
    li a {
        font-size: 1.2rem;
        color: #fff;
        margin: 0 10px;
        display: inline-block;
        transition: 0.5s;
        text-decoration: none;
        opacity: 0.75;
    }
    li a:hover {
        opacity: 1;
    }
`;

const Waves = styled.div``;

const Wave = styled.div`
    position: absolute;
    top: -98px;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: url(${props => props.wave});
    background-size: 1000px 100px;

    ${props => props.id === "wave1" && css`
        z-index: 1000;
        opacity: 1;
        bottom: 0;
        animation: ${animateWave} 4s linear infinite;
    `}
    ${props => props.id === "wave2" && css`
        z-index: 999;
        opacity: 0.5;
        bottom: 0;
        animation: ${animateWave_02} 4s linear infinite;
    `}
    ${props => props.id === "wave3" && css`
        z-index: 1000;
        opacity: 0.2;
        bottom: 15px;
        animation: ${animateWave_03} 3s linear infinite;
    `}
    ${props => props.id === "wave4" && css`
        z-index: 999;
        opacity: 0.7;
        bottom: 20px;
        animation: ${animateWave_04} 3s linear infinite;
    `}
`;

const animateWave = keyframes`
    0% {
        background-position-x: 1000px;
    }
    100% {
        background-position-x: 0px;
    }
`;
const animateWave_02 = keyframes`
    0% {
        background-position-x: 0px;
    }
    100% {
        background-position-x: 1000px;
    }
`;
const animateWave_03 = keyframes`
    0% {
        background-position-x: 1000px;
    }
    100% {
        background-position-x: 0px;
    }
`;
const animateWave_04 = keyframes`
    0% {
        background-position-x: 0px;
    }
    100% {
        background-position-x: 1000px;
    }
`;

export default function FooterAnimated() {
    return (
        <>
            <AnimatedFooter>
                <FFooter>
                    <Waves>
                        <Wave id="wave1" wave="/wave.png"></Wave>
                        <Wave id="wave2" wave="/wave.png"></Wave>
                        <Wave id="wave3" wave="/wave.png"></Wave>
                        <Wave id="wave4" wave="/wave.png"></Wave>
                    </Waves>
                    <SocialIcon>
                        <li><a href="https://www.facebook.com/friends/requests/?profile_id=100083593505150" target="_blank" title="Facebook (El enlace se abre en una nueva pestaña)"><ion-icon name="logo-facebook"></ion-icon></a></li>
                        <li><a href="https://www.instagram.com/championstore.col/" target="_blank" title="Instagram (El enlace se abre en una nueva pestaña)"><ion-icon name="logo-instagram"></ion-icon></a></li>
                    </SocialIcon>
                    <Menu>
                        <li><a href={'/'}>Home</a></li>
                        <li><a href={'/products'}>All products</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Account</a></li>
                        <li><a href="#">Cart</a></li>
                    </Menu>
                    <p>© Champion Store 2024</p>
                </FFooter>
                <Script
                    type="module"
                    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
                />
                <Script
                    nomodule
                    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
                />
            </AnimatedFooter>
        </>
    );
}
