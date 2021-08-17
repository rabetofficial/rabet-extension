import React from 'react';
import { connect } from 'react-redux';
import createClass from 'create-react-class';
import Select, { components } from 'react-select';
import { Link, withRouter } from 'react-router-dom';

import shorter from '../../../helpers/shorter';
import * as route from '../../../staticRes/routes';
import PopupList from '../../../pageComponents/PopupList';
import formatCurrency from '../../../helpers/formatCurrency';
import changeActiveAction from '../../../actions/accounts/changeActive';

import styles from './styles.less';

const Popup = (props) => {
  const items = props.accounts.map((item, index) => ({
    active: item.active,
    realPublicKey: item.publicKey,
    publicKey: shorter(item.publicKey, 8),
    name: item.name || `Account ${index + 1}`,
    balance: formatCurrency(item.balance || 0),
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

  const onChange = async (e) => {
    await changeActiveAction(e.publicKey);

    this.props.history.push(route.homePage);
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
          isSearchable
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

export default withRouter(connect((state) => ({
  accounts: state.accounts,
}))(Popup));
