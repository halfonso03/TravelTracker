import styled, { css } from "styled-components";

interface ITripStatus {
  status: string;
}

const TripStatus = styled.div<ITripStatus>`
  display: flex;
  justify-content: center;
  color: #fff;
  border-radius: 100px;
  font-weight: 500;
  padding: 2px;
  ${(props) =>
    props.status?.toLocaleLowerCase() === 'closed' &&
    css`
      background-color: var(--color-yellow-700);
    `}
  ${(props) =>
    props.status?.toLocaleLowerCase() === 'open' &&
    css`
      background-color: var(--color-green-700);
    `};
     ${(props) =>
    props.status?.toLocaleLowerCase() === 'cancelled' &&
    css`
      background-color: var(--color-blue-700);
    `};
`;

export default TripStatus;