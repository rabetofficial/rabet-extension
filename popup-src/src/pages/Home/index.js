import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';
import {Link, withRouter} from 'react-router-dom';

import Tabs from 'Root/components/Tabs';
import Input from 'Root/components/Input';
import shorter from 'Root/helpers/shorter';
import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import Loading from 'Root/components/Loading';
import * as route from 'Root/staticRes/routes';
import DropMenu from 'Root/components/DropMenu';
import CopyText from 'Root/components/CopyText';
import getData from 'Root/actions/accounts/getData';
import stellar from 'Root/assets/images/stellar.png';
import AssetList from 'Root/pageComponents/AssetList';
import changeNameAction from 'Root/actions/accounts/changeName';
import TransactionList from 'Root/pageComponents/TransactionList';
import { ShowPrivateKeyPage, flagPage } from 'Root/staticRes/routes';
import {buttonSizes, buttonTypes, inputSize} from 'Root/staticRes/enum';

import styles from './styles.less';

const assetList = [
  {logo: stellar, value: '2553', currency: 'GAS'},
  {logo: stellar, value: '2553', currency: 'GAS'},
  {logo: stellar, value: '2553', currency: 'GAS'},
  {logo: stellar, value: '2553', currency: 'GAS'},
  {logo: stellar, value: '2553', currency: 'GAS'},
  {logo: stellar, value: '2553', currency: 'GAS'},
];

const transactionList = [
  {address: 'f050fi5c…hjsDA89a', time: '22 sec ago', ops: '12'},
  {address: 'f050fi5c…hjsDA89a', time: '22 sec ago', ops: '12'},
  {address: 'f050fi5c…hjsDA89a', time: '22 sec ago', ops: '12'},
  {address: 'f050fi5c…hjsDA89a', time: '22 sec ago', ops: '12'},
  {address: 'f050fi5c…hjsDA89a', time: '22 sec ago', ops: '12'},
  {address: 'f050fi5c…hjsDA89a', time: '22 sec ago', ops: '12'},
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      loading: true,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const { accounts } = this.props;

    let activeAccount;
    let activeAccountIndex;

    for (let i = 0; i < accounts.length; ++i) {
      if (accounts[i].active) {
        activeAccount = accounts[i];
        activeAccountIndex = i;
        break;
      }
    }

    if (!activeAccount) {
      activeAccountIndex = 0;
      activeAccount = accounts[0];
    }

    getData(activeAccount.publicKey).then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  toggleEdit() {
    this.setState(prevState => ({
      editName: !prevState.editName,
    }));
  }

  async onSubmit (values) {
    await changeNameAction(values.name);
  }

  validateForm (values) {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required.';
    }

    return errors;
  }

  render() {
    const { accounts } = this.props;

    let activeAccount;
    let activeAccountIndex;

    for (let i = 0; i < accounts.length; ++i) {
      if (accounts[i].active) {
        activeAccount = accounts[i];
        activeAccountIndex = i;
        break;
      }
    }

    if (!activeAccount) {
      activeAccountIndex = 0;
      activeAccount = accounts[0];
    }

    const tabs = [
      {id : '1',
        tabTitle: 'Assets',
        tabContent: <AssetList items={ assetList } maxHeight={ this.state.editName ? 212: 222 }/>
      },
      {id : '2',
        tabTitle: 'Transaction',
        tabContent: <TransactionList items={ transactionList } maxHeight={ this.state.editName ? 220: 230 }/>
      },
    ];

    const dropMenuItems = [
      {
        label: 'Edit name',
        icon: 'icon-edit',
        onClick: this.toggleEdit,
      },
      {
        label: 'Show private key',
        icon: 'icon-key',
        onClick: () => {this.props.history.push(ShowPrivateKeyPage);}
      },
      {
        label: 'Show flags',
        icon: 'icon-flag',
        onClick: () => {this.props.history.push(flagPage);}
      },
    ];

    if (this.state.loading) {
      return <Loading />;
    }

    return (
         <>
           <Header />
           <div className={ styles.xlmBox }>
             <div className="pure-g">
               <div className="pure-u-1-2">
                 <h6 className={ styles.subject }><img className={ styles.xlm } src={ stellar } alt="xlm"/>XLM</h6>
                 <p className={ styles.value }>1254</p>
               </div>
               <div className="pure-u-1-2">
                 <h6 className={ styles.subject }>Total (USD)</h6>
                 <p className={ styles.value }><span>$</span> 6374.87</p>
               </div>
             </div>
           </div>
           <div className={ styles.infoBox }>
             <div className="pure-g">
               <div className="pure-u-11-12">
                 <label className="label-secondary">Name</label>
                 {this.state.editName ? (
                     <Form
                       onSubmit={ (values) => this.onSubmit(values) }
                       validate={ (values) => this.validateForm(values) }
                       render={ ({ submitError, handleSubmit }) => (
                             <form className={ classNames(styles.form, 'form pure-g') } onSubmit={ handleSubmit }>
                               <div className={ styles.field }>
                                 <Field name="name" initialValue={activeAccount.name || `Account ${activeAccountIndex + 1}`}>
                                   {({input, meta}) => (
                                       <Input
                                         type="text"
                                         size={ inputSize.small }
                                         style={ {width: '137px', marginTop: '0'} }
                                         input={ input }
                                         meta={ meta }
                                       />
                                   )}
                                 </Field>
                                 {submitError && <div className="error">{submitError}</div>}
                               </div>
                               <Button
                                 type="button"
                                 variant={ buttonTypes.primary }
                                 content={ <span className="icon-checkmark" /> }
                                 className={ styles.btn }
                                 onClick={ this.toggleEdit }
                               />
                             </form>
                         ) }
                     />
                 ): <p className={ styles.info }>{activeAccount.name || `Account ${activeAccountIndex + 1}`}</p>}
                 <label className="label-secondary">Address:</label>
                 <p className={ styles.info }>
                   <CopyText text={activeAccount.publicKey}  button={shorter(activeAccount.publicKey, 8)} />
                 </p>
               </div>
               <div className="pure-u-1-12">
                 <DropMenu width={ 198 } items={ dropMenuItems }>
                   <a className={ styles.expand }><span className="icon-expand-more" /></a>
                 </DropMenu>
               </div>
               <div className={ styles.buttonBox }>
                 <Link to={route.SendPage}>
                   <Button size={ buttonSizes.small } variant={ buttonTypes.primary } content="Operation" style={ {width: '112px'} } />
                 </Link>
                 <Link to={route.QRCodePage}>
                   <Button size={ buttonSizes.small } variant={ buttonTypes.outlined } content="Receive" style={ {width: '112px'} } />
                 </Link>
               </div>
             </div>
           </div>
           {/*tabs*/}
           <div style={ {marginTop: '12px'} }>
             <Tabs data={ tabs } tabTitleStyle={ {margin: '0 16px'} } />
           </div>
         </>
    );
  }
}

export default withRouter(connect(state => ({
  accounts: state.accounts,
}))(Home));
