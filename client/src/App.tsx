import { Outlet } from 'react-router-dom';
import '/src/App.css';
import Header from './features/Layout/Header';
import styled from 'styled-components';
import Menu from './ui/Menu';

const StyledBody = styled.div``;

const StyledOutlet = styled.div`
  flex: 8;
  background-color: var(--color-gray-900);
  padding: 2rem 4rem;
  color: var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-700);
`;

const StyledContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <StyledBody>
      <Header></Header>
      <StyledContainer>
        <Menu></Menu>

        <StyledOutlet>
          <Outlet></Outlet>
        </StyledOutlet>
      </StyledContainer>
    </StyledBody>
  );
}

export default App;
