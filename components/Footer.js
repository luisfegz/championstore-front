import styled from "styled-components";

const SectionP1 = styled.div`
	text-decoration: none;
`;

const Copyright = styled.div`
    text-decoration: none;
    width: 100%;
    text-align: center;
`;

const MenuSocialItem = styled.div`
    text-decoration: none;
`;

export default function Footer() {
    return (
        <SectionP1>
            <Copyright>
                <p>©2023. ChampionStore. Dropshipping & Ecommerce</p>
                <br/>
                <MenuSocialItem>
                    <a href="https://www.instagram.com/championstore.col/" target="_blank" title="Instagram (El enlace se abre en una nueva pestaña)">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50">
                            <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/friends/requests/?profile_id=100083593505150" target="_blank" title="Facebook (El enlace se abre en una nueva pestaña)">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
                        </svg>
                    </a>
                </MenuSocialItem>
            </Copyright >
        </SectionP1>
    );
}