import Select from 'react-select';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as route from 'popup/staticRes/routes';
import changeNetworkAction from 'popup/actions/options/changeNetwork';
import logo from '../../../assets/images/logo.svg';

import * as S from './styles';
import PopupSearch from './PopupSearch';

export const items = [
  { value: 'MAINNET', label: 'Main Network' },
  { value: 'TESTNET', label: 'Test Network' },
];

const Header = (props) => {
  const navigate = useNavigate();
  const { options } = props;

  let index = 0;

  if (options.network === 'MAINNET') {
    index = 0;
  } else if (options.network === 'TESTNET') {
    index = 1;
  }

  const [overlay, toggleOverLay] = useState(false);
  const [selected, setSelected] = useState(items[index]);

  const onChangeNetwork = (e) => {
    changeNetworkAction(e, navigate);

    setSelected(e);
  };
  const toggleOverlay = (open) => {
    toggleOverLay(open);
  };
  return (
    <>
      <div
        className="overlay"
        style={{ display: overlay ? 'block' : 'none' }}
        onClick={() => {
          toggleOverlay(false);
        }}
      />
      <S.Comp>
        <S.Header>
          <div className="pure-g" style={{ position: 'relative' }}>
            <div className="pure-u-4-24">
              <Link to={route.homePage}>
                <S.Logo>
                  <img src={logo} alt="logo" />
                </S.Logo>
              </Link>
            </div>
            <div className="pure-u-16-24">
              <S.Select
              // {selected === items[0] ? styles.main : styles.test}
              >
                <Select
                  classNamePrefix="net"
                  separator={false}
                  closeMenuOnSelect={true}
                  defaultValue={items[index]}
                  options={items}
                  hideSelectedOptions={false}
                  isSearchable={false}
                  backspaceRemovesValue={false}
                  onChange={(e) => onChangeNetwork(e)}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused
                        ? 'black'
                        : 'black',
                      boxShadow: state.isFocused ? 0 : 0,
                      '&:hover': { borderColor: 'black' },
                    }),
                  }}
                />
              </S.Select>
            </div>
            <div className="pure-u-4-24">
              <PopupSearch
                toggleOverlay={toggleOverlay}
                isOpen={overlay}
              />
            </div>
          </div>
        </S.Header>
      </S.Comp>
      <div style={{ height: '60px' }} />
    </>
  );
};

Header.propTypes = {};

export default connect((state) => ({
  options: state.options,
}))(Header);
