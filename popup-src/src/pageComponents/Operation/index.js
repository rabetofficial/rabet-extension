import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'Root/components/Button';
import Card from 'Root/components/Card';
import SelectOption from 'Root/components/SelectOption';

import PaymentOps from 'Root/pageComponents/Operation/PaymentOps';
import PaymentSendOps from 'Root/pageComponents/Operation/PaymentSendOps';
import PaymentReceiveOps from 'Root/pageComponents/Operation/PaymentReceiveOps';
import OfferOps from 'Root/pageComponents/Operation/OfferOps';
import SetOptionOps from 'Root/pageComponents/Operation/SetOptionOps';
import SignerOps from 'Root/pageComponents/Operation/SignerOps';
import ThresholdOps from 'Root/pageComponents/Operation/ThresholdOps';
import ChangeTrustOps from 'Root/pageComponents/Operation/ChangeTrustops';
import AllowTrustOps from 'Root/pageComponents/Operation/AllowTrustOps';
import ManageDataOps from 'Root/pageComponents/Operation/ManageDataOps';

import styles from './styles.less';

const deleteBtn = <><span className="icon-trash" />{''}Delete</>;

const items = [
  {value: 'payment', label: 'Payment'},
  {value: 'path-send', label: 'Path payment strict send'},
  {value: 'path-receive', label: 'Path payment strict receive'},
  {value: 'offer', label: 'Manage offer'},
  {value: 'passive-offer', label: 'Manage passive offer'},
  {value: 'option-inflation', label: 'Set Options (inflation)'},
  {value: 'option-clear-flag', label: 'Set Options (Clear flag)'},
  {value: 'option-set-flag', label: 'Set Options (Set flag)'},
  {value: 'option-master-weight', label: 'Set Options (Master weight)'},
  {value: 'option-domain', label: 'Set Options (Home domain)'},
  {value: 'option-signer', label: 'Set Options (Signer)'},
  {value: 'option-threshold', label: 'Set Options (Threshold)'},
  {value: 'change-trust', label: 'Change trust'},
  {value: 'allow-trust', label: 'Allow trust'},
  {value: 'account', label: 'Account merge'},
  {value: 'manage', label: 'Manage data'},
  {value: 'bump', label: 'Bump sequence'},
];

class Operation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({selected: e});
  }

  generateOption() {
    if(this.state.selected === items[0]) return <PaymentOps />;
    if(this.state.selected === items[1]) return <PaymentSendOps />;
    if(this.state.selected === items[2]) return <PaymentReceiveOps />;
    if((this.state.selected === items[3]) || (this.state.selected === items[4])) return <OfferOps />;
    if(this.state.selected === items[5]) return <SetOptionOps label="Inflation destination" inputInfo={ {type: 'text', placeholder: 'G…'} } />;
    if(this.state.selected === items[6]) return <SetOptionOps label="Clear flag" inputInfo={ {type: 'number', placeholder: '1'} } />;
    if(this.state.selected === items[7]) return <SetOptionOps label="Set flag" inputInfo={ {type: 'number', placeholder: '1'} } />;
    if(this.state.selected === items[8]) return <SetOptionOps label="Master weight" inputInfo={ {type: 'number', placeholder: '1'} } />;
    if(this.state.selected === items[9]) return <SetOptionOps label="Home domain" inputInfo={ {type: 'text', placeholder: 'www.sample.com'} } />;
    if(this.state.selected === items[10]) return <SignerOps />;
    if(this.state.selected === items[11]) return <ThresholdOps />;
    if(this.state.selected === items[12]) return <ChangeTrustOps />;
    if(this.state.selected === items[13]) return <AllowTrustOps />;
    if(this.state.selected === items[14]) return <SetOptionOps label="Destination" inputInfo={ {type: 'text', placeholder: 'G...'} } />;
    if(this.state.selected === items[15]) return <ManageDataOps />;
    if(this.state.selected === items[16]) return <SetOptionOps label="Bump to" inputInfo={ {type: 'number', placeholder: '1234'} } />;
    return <PaymentOps />;
  }

  render() {
    return (
        <div className={ styles.main }>
          <Card type="card-secondary">
            <SelectOption items={ items } onChange={ this.onChange } variant="select-default" />
            <div className={ styles.ops }>
              {this.generateOption()}
              <div className={ styles.delete }>
                <Button
                  type="button"
                  variant="btn-danger"
                  size="btn-medium"
                  content={ deleteBtn }
                  onClick={ () =>  this.props.deleteOperations(this.props.id) }
                />
              </div>
            </div>
          </Card>
        </div>
    );
  }
}

Operation.propTypes = {
  deleteOperations: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Operation;
