import PropTypes from 'prop-types';
import React, {Component} from 'react';

import Card from 'Root/components/Card';
import Button from 'Root/components/Button';
import SelectOption from 'Root/components/SelectOption';
import removeOperationAction from 'Root/actions/operations/remove';

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
    this.removeOperation = this.removeOperation.bind(this);
  }

  onChange(e) {
    this.setState({ selected: e });
  }

  removeOperation() {
    removeOperationAction(this.props.id);
  }

  generateOption() {
    const { id } = this.props;

    if(this.state.selected === items[0]) return <PaymentOps id={id} />;
    if(this.state.selected === items[1]) return <PaymentSendOps id={id} />;
    if(this.state.selected === items[2]) return <PaymentReceiveOps id={id} />;
    if((this.state.selected === items[3]) || (this.state.selected === items[4])) return <OfferOps id={id} />;
    if(this.state.selected === items[5]) return <SetOptionOps label="Inflation destination" inputInfo={ {type: 'text', placeholder: 'G…'} } id={id} />;
    if(this.state.selected === items[6]) return <SetOptionOps label="Clear flag" inputInfo={ {type: 'number', placeholder: '1'} } id={id} />;
    if(this.state.selected === items[7]) return <SetOptionOps label="Set flag" inputInfo={ {type: 'number', placeholder: '1'} } id={id} />;
    if(this.state.selected === items[8]) return <SetOptionOps label="Master weight" inputInfo={ {type: 'number', placeholder: '1'} } id={id} />;
    if(this.state.selected === items[9]) return <SetOptionOps label="Home domain" inputInfo={ {type: 'text', placeholder: 'www.sample.com'} } id={id} />;
    if(this.state.selected === items[10]) return <SignerOps id={id} />;
    if(this.state.selected === items[11]) return <ThresholdOps id={id} />;
    if(this.state.selected === items[12]) return <ChangeTrustOps id={id} />;
    if(this.state.selected === items[13]) return <AllowTrustOps id={id} />;
    if(this.state.selected === items[14]) return <SetOptionOps label="Destination" inputInfo={ {type: 'text', placeholder: 'G...'} } id={id} />;
    if(this.state.selected === items[15]) return <ManageDataOps id={id} />;
    if(this.state.selected === items[16]) return <SetOptionOps label="Bump to" inputInfo={ {type: 'number', placeholder: '1234'} } id={id} />;
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
