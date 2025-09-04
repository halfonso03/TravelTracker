import { Outlet } from 'react-router-dom';
import '/src/App.css';
import styled from 'styled-components';
import Menu from './ui/Menu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TopBar from './ui/TopBar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const StyledBody = styled.div``;

const StyledOutlet = styled.div`
  flex: 9;
  background-color: var(--color-gray-900);
  padding: 3rem 3rem;
  color: var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-800);
`;

const StyledContainer = styled.div`
  display: flex;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <StyledBody>
        <TopBar></TopBar>
        <StyledContainer>
          <Menu></Menu>
          <StyledOutlet>
            <Outlet></Outlet>
          </StyledOutlet>
        </StyledContainer>
      </StyledBody>
    </QueryClientProvider>
  );
}

export default App;
