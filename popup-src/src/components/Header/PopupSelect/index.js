import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import createClass from 'create-react-class';
import Select, { components } from 'react-select';

import shorter from 'Root/helpers/shorter';
import * as route from 'Root/staticRes/routes';
import PopupList from 'Root/pageComponents/PopupList';
import changeActiveAction from 'Root/actions/accounts/changeActive';

import styles from './styles.less';

// export const items = [
//   { value: 'Matin', label: {name: 'Amir Ansari 2', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'} },
//   { value: 'Mojtaba Mousavi', label: {name: 'Mojtaba Mousavi', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'}},
//   { value: 'Shayan nm' ,label: {name: 'Shayan nm', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'}},
//   { value: 'Reza Ahmadi' , label: {name: 'Reza Ahmadi', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'}},
// ];

const Popup = props => {
  const items = props.accounts.map((item, index) => ({
    active: item.active,
    amount: item.balance || 0,
    realPublicKey: item.publicKey,
    publicKey: shorter(item.publicKey, 10),
    name: item.name || `Account ${index + 1}`,
  }));

  let activeAccountIndex = items.findIndex(x => x.active);

  if (activeAccountIndex === -1) {
    activeAccountIndex = 0;
  }

  const options = items.map((item) =>(
    {name: item.name, publicKey: item.realPublicKey, label: <PopupList info={ item }/> }
  ) );

  const Option = createClass({
    render() {
      return (
          <div className="custom-option">
            <components.Option { ...this.props }>
              {this.props.label}
            </components.Option>
            <div className={ styles.group }>
              <Link to={route.createWalletPage} className={ styles.link }><span className="icon-plus-math" />Create Wallet</Link>
              <Link to={route.restoreWalletPage} className={ styles.link }><span className="icon-file" />Import Wallet</Link>
            </div>
            {/*{(this.props.innerProps.id === `react-select-2-option-${items.length - 1}`) &&*/}
            {/*}*/}
          </div>
      );
    }
  });

  const onChange = (e) => {
    changeActiveAction(e.publicKey);
  };

  return (
      <div className={ styles.popup }>
        <Select
          classNamePrefix="popup"
          separator={ false }
          closeMenuOnSelect={ true }
          components={ { Option } }
          defaultValue={ options[activeAccountIndex] }
          options={ options }
          hideSelectedOptions={ false }
          isSearchable={ false }
          backspaceRemovesValue={ false }
          placeholder="A"
          onChange={ (e) => onChange(e) }
          onMenuOpen={ () =>  {props.toggleOverlay(true);} }
          onMenuClose={ () =>  {props.toggleOverlay(false);} }
          styles={ {
              ...styles,
              control: (base, state) => ({
                ...base,
                borderColor: state.isFocused ? 'black': 'black',
                boxShadow: state.isFocused ? 0 : 0,
                '&:hover': { borderColor: 'black' },
              }),
            } }
        />
      </div>
  );
};

Popup.propTypes = {

};

export default connect(state => ({
  accounts: state.accounts,
}))(Popup);
