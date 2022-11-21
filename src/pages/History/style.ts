/* eslint-disable prettier/prettier */
import styled from 'styled-components'

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme['gray-100']};
    }
`

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse; // basicamente se eu boto por exemplo uma borda no td de 1px, se eu nn botar o border-collapse, ele vai pegar 1px do td da esquerda, e 1px do td da direita, se eu boto isso, conta como se existisse uma borda apenas entre eles.
        min-width: 600px;

        th {
            background-color: ${props => props.theme['gray-600']};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme['gray-100']};
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }
            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }

        td {
            background-color: ${props => props.theme['gray-700']};
            border-top: 4px solid ${props => props.theme['gray-800']};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }
            &:last-child {
                padding-right: 1.5rem;
            }
        }
    }
`

const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500'
} as const // oque é, eu criei um objeto, o typescript quando le um objeto, ele entende que pode ter essas chaves de cor, e o valor dessas propriedades é um texto, texto variável, para eu dizer para o ts que esses textos sempre vai ser um desses 3, eu passo o as const
// ele da exclusivamente o yellow-500, não só uma string.

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS; // isso aqui ta falando para ele que são as keys do meu tipo dos meus STATUS_COLORS, passo o typeof para que o ts consiga trabalhar
}

export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${props => props.theme[STATUS_COLORS[props.statusColor]]} 
    }
`

