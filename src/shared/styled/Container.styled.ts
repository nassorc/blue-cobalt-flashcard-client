import styled from 'styled-components';

export const PageContainer = styled.section`
    padding-inline: 1rem;
    margin: 1rem auto;
    max-width: 1000px;
`
export const PageHeader = styled.div`
    ${({split}) => split && `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `}

    & > h1 {
        margin-bottom: 3rem;
    }
`