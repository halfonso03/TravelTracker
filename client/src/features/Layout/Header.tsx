import styled from 'styled-components';

const StyledHeader = styled.div`
  font-weight: bold;
  color: var(--color-grey-100);
  background-color: var(--color-grey-800);
  padding: 1rem;
  height: 4rem;
`;

export default function Header() {
  return <StyledHeader></StyledHeader>;
}
