import React from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';

const Container = styled.div`
  .react-switch-handle {
    height: 32px !important;
    width: 32px !important;
    right: 4px !important;
    top: 4px !important;
    left: 4px !important;
  }

  .react-switch-bg {
    border: 1px solid #ededed;
  }
`;

type AppProps = {
  handleChange: (value: boolean) => void;
  checked: boolean;
  disabled?: boolean;
};

const ToggleSwitch = ({
  handleChange,
  checked,
  disabled,
}: AppProps) => (
  <Container>
    <Switch
      disabled={disabled}
      onChange={handleChange}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
      boxShadow="0 0 0 0"
      activeBoxShadow="0 0 0 0"
      height={40}
      width={76}
      offColor="#f8f8f8"
      onColor="#f8f8f8"
      offHandleColor="#d5d5d5"
      onHandleColor="#000000"
    />
  </Container>
);

ToggleSwitch.defaultProps = {
  disabled: false,
};

export default ToggleSwitch;
