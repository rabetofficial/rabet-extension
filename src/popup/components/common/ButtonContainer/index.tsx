import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { JustifyContent } from 'popup/models';
import isEmpty from '../../../../helpers/isEmpty';

type AppProps = {
  children: React.ReactNode;
  btnSize: number;
  justify?: JustifyContent;
  gap?: number;
  mt?: number;
  positionStyles?: React.CSSProperties;
};

const Container = styled.div.attrs((props: AppProps) => props)`
  margin-top: ${(props) => props.mt}px;

  ${({ positionStyles }) =>
    positionStyles &&
    `
     position: absolute;
  `}

  button {
    width: ${(props) => props.btnSize}px!important;

    &:first-child {
      margin-right: ${(props) => props.gap}px;
    }
  }
`;

// for flex use: justify
// for absolute use : positionStyles and justify

const ButtonContainer = (props: AppProps) => {
  const { children, justify, positionStyles } = props;
  return (
    <>
      {isEmpty(positionStyles) ? (
        <Container
          {...props}
          className={classNames(
            'flex',
            justify && `justify-${justify}`,
          )}
        >
          {children}
        </Container>
      ) : (
        <div
          className={classNames(
            'flex',
            justify && `justify-${justify}`,
          )}
        >
          <Container
            {...props}
            className="flex"
            style={{ ...positionStyles }}
          >
            {children}
          </Container>
        </div>
      )}
    </>
  );
};

ButtonContainer.defaultProps = {
  gap: 0,
  mt: 0,
  positionStyles: null,
  justify: '',
};

export default ButtonContainer;
