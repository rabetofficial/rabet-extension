import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import createClass from 'create-react-class';
import PopupList from 'Root/pageComponents/PopupList';
import styles from './styles.less';

export const items = [
  { value: 'Amir Ansari 2', label: {name: 'Amir Ansari 2', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'} },
  { value: 'Mojtaba Mousavi', label: {name: 'Mojtaba Mousavi', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'}},
  { value: 'Shayan nm' ,label: {name: 'Shayan nm', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'}},
  { value: 'Reza Ahmadi' , label: {name: 'Reza Ahmadi', address: 'NTBoWouU…UJWE5ftD', amount: '10 XLM'}},
];

const options = items.map((item, index) =>(
    {value: item.value, label: <PopupList info={ item.label }/> }
) );

const Popup = props => {
  const Option = createClass({
    render() {
      return (
          <div className="custom-option">
            <components.Option { ...this.props }>
              {this.props.label}
            </components.Option>
            <div className={ styles.group }>
              <a href="" className={ styles.link }><span className="icon-plus-math" />Create Wallet</a>
              <a href="" className={ styles.link }><span className="icon-file" />Import Wallet</a>
            </div>
            {/*{(this.props.innerProps.id === `react-select-2-option-${items.length - 1}`) &&*/}
            {/*}*/}
          </div>
      );
    }
  });

  const onChange = (e) => {
    console.log(e);
  };

  return (
      <div className={ styles.popup }>
        <Select
          classNamePrefix="popup"
          separator={ false }
          closeMenuOnSelect={ false }
          components={ { Option } }
          defaultValue={ options[0] }
          options={ options }
          hideSelectedOptions={ false }
          isSearchable={ false }
          backspaceRemovesValue={ false }
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

export default Popup;
