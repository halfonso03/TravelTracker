import styled, { css } from 'styled-components';
type ButtonType = 'primary' | 'secondary' | 'danger';
type Sizes = 'small' | 'medium' | 'large';

interface ButtonProps {
  variation: ButtonType;
  size: Sizes
}

const sizes = {
  small: css`
    font-size: .6rem !important;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    text-align: center;
  `,
  medium: css`
    font-size: 1rem !important;
    padding: .5rem 1.5rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};





const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border: 1px solid var(--color-brand-500);
    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-900);
    border: 1px solid var(--color-grey-800);
    &:hover {
      background-color: var(--color-grey-800);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};


const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => variations[props.variation]}
  ${(props) => sizes[props.size]}
`;

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;
