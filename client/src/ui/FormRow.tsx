import styled from 'styled-components';
import type { FC, ReactNode } from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

type FormRowProps = {
  id: string;
  label: string;
  children: ReactNode;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  useMessage?: boolean;
};

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 0.2fr;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    /* border-bottom: 1px solid var(--color-grey-100); */
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  align-self: center;
  font-weight: 500;
`;

const Error = styled.div`
  font-size: 2rem;
  padding-left: 0.5rem;
  color: var(--color-red-700);
`;

const FormRow: FC<FormRowProps> = ({
  id,
  label,
  error,
  children,
  useMessage,
}: FormRowProps) => {
  return (
    <StyledFormRow>
      <div>{label && <Label htmlFor={id}>{label}</Label>}</div>
      <div>{children}</div>
      <div>
        {error && useMessage && <Error>{error.toString()}</Error>}

        {error && !useMessage && (
          <Error>
            <BsFillExclamationTriangleFill></BsFillExclamationTriangleFill>
          </Error>
        )}
        {!error && <Error style={{ visibility: 'hidden' }}>*</Error>}
      </div>
    </StyledFormRow>
  );
};

export default FormRow;
