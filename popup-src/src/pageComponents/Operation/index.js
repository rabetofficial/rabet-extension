import PropTypes from 'prop-types';
import React, {Component} from 'react';
import classNames from 'classnames';

import Card from 'Root/components/Card';
import Button from 'Root/components/Button';
import SelectOption from 'Root/components/SelectOption';
import * as operations from 'Root/staticRes/operations';
import removeOperationAction from 'Root/actions/operations/remove';
import changeOperationAction from 'Root/actions/operations/change';

import OfferOps from 'Root/pageComponents/Operation/OfferOps';
import SignerOps from 'Root/pageComponents/Operation/SignerOps';
import PaymentOps from 'Root/pageComponents/Operation/PaymentOps';
import SetOptionOps from 'Root/pageComponents/Operation/SetOptionOps';
import ThresholdOps from 'Root/pageComponents/Operation/ThresholdOps';
import AllowTrustOps from 'Root/pageComponents/Operation/AllowTrustOps';
import ManageDataOps from 'Root/pageComponents/Operation/ManageDataOps';
import PaymentSendOps from 'Root/pageComponents/Operation/PaymentSendOps';
import ChangeTrustOps from 'Root/pageComponents/Operation/ChangeTrustops';
import PaymentReceiveOps from 'Root/pageComponents/Operation/PaymentReceiveOps';

import styles from './styles.less';

const deleteBtn = <><span className="icon-trash" />{''}Delete</>;

const items = [
  {value: operations.payment, label: 'Payment'},
  {value: operations.pathPaymentStrictSend, label: 'Path payment strict send'},
  {value: operations.pathPaymentStrictReceive, label: 'Path payment strict receive'},
  {value: operations.manageBuyOffer, label: 'Manage offer'},
  {value: operations.createPassiveSellOffer, label: 'Manage passive offer'},
  {value: operations.setOptionsInflationDest, label: 'Set Options (inflation)'},
  {value: operations.setOptionsClearFlags, label: 'Set Options (Clear flag)'},
  {value: operations.setOptionsSetFlags, label: 'Set Options (Set flag)'},
  {value: operations.setOptionsMasterWeight, label: 'Set Options (Master weight)'},
  {value: operations.setOptionsHomeDomain, label: 'Set Options (Home domain)'},
  {value: operations.setOptionsSigner, label: 'Set Options (Signer)'},
  {value: operations.setOptionsThreshold, label: 'Set Options (Threshold)'},
  {value: operations.changeTrust, label: 'Change trust'},
  {value: operations.allowTrust, label: 'Allow trust'},
  {value: operations.accountMerge, label: 'Account merge'},
  {value: operations.manageData, label: 'Manage data'},
  {value: operations.bumpSequence, label: 'Bump sequence'},
];

class Operation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };

    this.onChange = this.onChange.bind(this);
    this.removeOperation = this.removeOperation.bind(this);
  }

  onChange(e) {
    this.forceUpdate();
    changeOperationAction(this.props.id, { type: e.value });

    this.setState({ selected: e });
  }

  removeOperation() {
    removeOperationAction(this.props.id);

    const newOperations = this.props.state.operations.filter(x => x.id !== this.props.id);

    this.props.setState({
      operations: newOperations,
    });
  }

  generateOption() {
    const { id } = this.props;

    if(this.state.selected === items[0]) return <PaymentOps id={id} />;
    if(this.state.selected === items[1]) return <PaymentSendOps id={id} />;
    if(this.state.selected === items[2]) return <PaymentReceiveOps id={id} />;
    if(this.state.selected === items[3]) return <OfferOps id={id} type={operations.manageBuyOffer} />;
    if(this.state.selected === items[4]) return <OfferOps id={id} type={operations.createPassiveSellOffer} />;
    if(this.state.selected === items[5]) return <SetOptionOps label="Inflation destination" inputInfo={ {type: 'text', placeholder: 'G…'} } id={id} type={operations.setOptionsInflationDest} />;
    if(this.state.selected === items[6]) return <SetOptionOps label="Flag number" inputInfo={ {type: 'number', placeholder: '1'} } id={id} type={operations.setOptionsClearFlags} />;
    if(this.state.selected === items[7]) return <SetOptionOps label="Flag number" inputInfo={ {type: 'number', placeholder: '1'} } id={id} type={operations.setOptionsSetFlags} />;
    if(this.state.selected === items[8]) return <SetOptionOps label="Weight" inputInfo={ {type: 'number', placeholder: '1'} } id={id} type={operations.setOptionsMasterWeight} />;
    if(this.state.selected === items[9]) return <SetOptionOps label="Domain address" inputInfo={ {type: 'text', placeholder: 'sample.com'} } id={id} type={operations.setOptionsHomeDomain} />;
    if(this.state.selected === items[10]) return <SignerOps id={id} />;
    if(this.state.selected === items[11]) return <ThresholdOps id={id} />;
    if(this.state.selected === items[12]) return <ChangeTrustOps id={id} />;
    if(this.state.selected === items[13]) return <AllowTrustOps id={id} />;
    if(this.state.selected === items[14]) return <SetOptionOps label="Destination" inputInfo={ {type: 'text', placeholder: 'G...'} } id={id} type={operations.accountMerge} />;
    if(this.state.selected === items[15]) return <ManageDataOps id={id} />;
    if(this.state.selected === items[16]) return <SetOptionOps label="Bump to" inputInfo={ {type: 'number', placeholder: '1234'} } id={id} type={operations.bumpSequence} />;
    return <PaymentOps id={id} />;
  }

  componentDidMount() {
    const { type } = this.props;

    const defaultItem = items.find(x => x.value === type);

    if (type) {
      this.setState({
        selected: defaultItem,
      });
    }
  }

  render() {
    return (
        <div className={ styles.main }>
          <Card type="card-secondary">
            <SelectOption
              items={items}
              defaultValue={items[0]}
              variant="select-default"
              onChange={this.onChange}
              selected={this.state.selected}
            />

            <div className={ styles.ops }>
              {this.generateOption()}

              <div className={ styles.delete }>
                <Button
                  type="button"
                  variant="btn-danger"
                  size="btn-medium"
                  content={ deleteBtn }
                  onClick={ this.removeOperation }
                />
              </div>
            </div>
          </Card>
        </div>
    );
  }
}

Operation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Operation;
