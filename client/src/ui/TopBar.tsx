import type { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children?: ReactNode;
};

const StyledHeader = styled.div`
  font-weight: bold;
  color: var(--color-grey-100);
  background-color: var(--color-grey-1000);
  padding: 1rem;
  height: 4rem;
`;

export default function TopBar({ children }: Props) {
  return <StyledHeader>{children}</StyledHeader>;
}
