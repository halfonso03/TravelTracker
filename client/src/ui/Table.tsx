/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { createContext, useContext, type FC, type ReactNode } from 'react';

interface CommonRowProps {
  $columns: string;
}

interface TableProps {
  columns: string;
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableBodyProps {
  data: any[];
  render: (data: any) => React.ReactNode;
}

interface CellProps {
  children: ReactNode;
}

interface ITable extends FC<TableProps> {
  Row: FC<TableRowProps>;
  Header: FC<TableHeaderProps>;
  Body: FC<TableBodyProps>;
  Cell: any;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledTable = styled.div.attrs({ className: 'MY_TABLE' })`
  border: 1px solid var(--color-grey-800);
  font-size: 0.8rem;
  background-color: var(--color-grey-800);
  border-radius: 7px;
  overflow: hidden;
`;

const StyledHeader = styled(CommonRow).attrs({
  className: 'MY_TABLE_HEADER ',
})`
  background-color: var(--color-grey-900);
  border-bottom: 1px solid var(--color-grey-700);
  /* text-transform: uppercase; */
  letter-spacing: 0.9px;
  font-size: 0.98rem;
  color: var(--color-grey-200);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const StyledRow = styled(CommonRow).attrs({
  className: 'MY_TABLE_ROW ',
})`
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-gray-700);
  transition: background-color 0.2s ease-in-out;
`;

const StyledCell = styled.div.attrs({
  className: 'MY_TABLE_CELL ',
})`
  padding: 0.3rem 1rem;
`;

const StyledBody = styled.section`
  /* margin: 0.4rem 0; */
  :last-child {
    border-bottom: none;
  }
`;

// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;

//   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
//   &:not(:has(*)) {
//     display: none;
//   }
// `;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// BEGIN TABLE CONTEXT

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType | null>(null);

const Table: ITable = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header: FC<TableHeaderProps> = ({ children }) => {
  const { columns } = useContext<TableContextType>(TableContext as any);

  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

const Body: FC<TableBodyProps> = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

const Row: FC<TableRowProps> = ({ children }) => {
  const { columns } = useContext<TableContextType>(TableContext as any);
  return (
    <StyledRow $columns={columns} role="row">
      {children}
    </StyledRow>
  );
};

const Cell: FC<CellProps> = ({ children }) => {
  return <StyledCell>{children}</StyledCell>;
};

Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Cell = Cell;

export default Table;
