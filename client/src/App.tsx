import { NavLink, Outlet } from 'react-router-dom';
import '/src/App.css';
import Header from './features/Layout/Header';
import styled from 'styled-components';
import Heading from './ui/Heading';

const StyledBody = styled.div`
  padding: 2rem;
  width: 80%;
  margin: auto;
`;

const StyledOutlet = styled.div`
  flex: 6;
  background-color: var(--color-gray-900);
  padding: 2rem;
  color: var(--color-grey-200);
  border-radius: var(--border-radius-sm);
`;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledMenu = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const StyledMenuItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0 0.5rem 0;
`;

function App() {
  return (
    <StyledBody>
      <Header></Header>
      <StyledContainer>
        <StyledMenu className="flex-col gap-1">
          <StyledMenuItem className="menu-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
            >
              <Heading as="h5">Home</Heading>
            </NavLink>
          </StyledMenuItem>
          <StyledMenuItem className="menu-item">
            <NavLink
              to="/trips"
              className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
            >
              <Heading as="h5">Trips</Heading>
            </NavLink>
          </StyledMenuItem>
          <StyledMenuItem className="menu-item">
            <NavLink
              to="/travellers"
              className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
            >
              <Heading as="h5">Travellers</Heading>
            </NavLink>
          </StyledMenuItem>
        </StyledMenu>
        <StyledOutlet>
          <Outlet></Outlet>
        </StyledOutlet>
      </StyledContainer>
    </StyledBody>
  );
}

export default App;
