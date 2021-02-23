import React, {Component} from 'react';
import classNames from 'classnames';
import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import icon from 'Root/assets/images/globe.svg';
import styles from './styles.less';

class ContactRequest extends Component {
  render() {
    return (
        <div className={ styles.page }>
          <Header/>
          <div className="content">
            <h6 className={ styles.contact }>Contact Request</h6>
            <div className={ styles.step }>
              <div className="pure-g step-container">
                <div className="step step-one flex-parent" style={{alignItems: 'center'}}>
                 {/*step one*/}
                  <img src={icon} alt="icon"/>
                </div>
                <div className="step step-two">AA</div>
                <div className="icon-checkmark step-checked" />
              </div>
              <div className="pure-g step-name-container">
                <div className="pure-u-4-24">
                  <p className="step-name">Name</p>
                </div>
                <div className="pure-u-5-24">
                  <p className="step-name">Amir Ansari</p>
                </div>
              </div>
            </div>
            <h1 className={ styles.title }>Name would like to connect to your account</h1>
            <div className={ classNames('pure-g', styles.buttons) }>
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
              />
              <Button
                type="submit"
                variant="btn-primary"
                size="btn-medium"
                content="Connect"
              />
            </div>
          </div>
        </div>
    );
  }
}

export default ContactRequest;
