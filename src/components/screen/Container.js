import styled from 'styled-components';

export const Container = styled.div`
    padding: 30px;
    outline: none;
    text-align: center;
    font-size: ${(props) => props.size <= 150 ? '9vw' : '8vw'};
    flex: 1 1 auto;
    display: flex;
    color: #c1c0c0;
`;

export default Container;
