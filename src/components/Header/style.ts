/* eslint-disable prettier/prettier */
import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        gap: 0.5rem;

        a {
            width: 3rem;
            height: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            color: ${props => props.theme['gray-100']};

            border-top:3px solid transparent;
            border-bottom:3px solid transparent; // eu coloco essas bordas tanto no topo, quanto no bottom, para que ele não jogue o icone pra cima. E ela esteja lá desde sempre, porém transparente. E a borda de cima, serve para manter no centro, mesmo que a borda não apareça 
        
            transition: 0.1s all ease-in-out;

            &:hover {
                border-bottom:3px solid ${props => props.theme['green-500']};
            }

            &.active {
                color: ${props => props.theme['green-500']};
            }
        }
    }
`