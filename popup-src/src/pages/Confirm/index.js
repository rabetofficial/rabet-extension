import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Card from 'Root/components/Card';
import Button from 'Root/components/Button';
import CopyText from 'Root/components/CopyText';
import PageTitle from 'Root/components/PageTitle';

import styles from './styles.less';

const items = [
  {
    title: '#1-Payment',
    info: [
        {
          title: 'Destination',
          value: 'kjbjksdbbskdbjlsdbvlsdvdkbli84y28389096036937609309380964',
          error: 'Destination is invalid'
        },
        {
          title: 'Amount',
          value: '145 XLM',
          error: 'Insufficient XLM balance'
        }
        ]
  },
  {
    title: '#2-Manage data',
    info: [
      {title: 'Key', value: 'HelloWorld'},
      {title: 'Value', value: 'John Snow'},
    ]
  },
  {
    info: [
      {title: 'Memo', value: '10$'}
    ]
  }
];

class Confirm extends Component {
  render() {
    return (
        <>
          <div className={ classNames(styles.confirm, 'hidden-scroll content-scroll') }>
            <PageTitle status="warn" statusTitle="Test network" />
            {/*status:*/}
            {/*warn*/}
            {/*success*/}
            <div className="content">
              <p className={ styles.source }>
                <span className={ styles.sourceTitle }>Source account:</span>
                <span className={ styles.sourceValue }>
                  <CopyText text="GAMMnonojnVS3O" button="GAMM...VS3O" />
                </span>
              </p>
              {items.map((item, index) => (
                  <div className={ styles.box } key={ index }>
                    <Card type="card-secondary">
                      {item.title &&  <h1 className={ styles.title }>{item.title}</h1>}
                      {item.info.map((info) => (
                          <div key={ info.title }>
                            <h2
                              className={ styles.valueTitle }
                              style={ {margin: !item.title && '0'} }
                            >{info.title}</h2>
                            <p className={ styles.value }>{info.value}</p>
                            {info.error &&
                            <p className="error">
                              <span className="icon-exclamation-circle"/>{' '}{info.error}
                            </p>
                            }
                          </div>
                      ))}
                    </Card>
                  </div>
              ))}
            </div>
          </div>
          <div className={ classNames('pure-g justify-end', styles.buttons) }>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Back"
              onClick={() => {this.props.history.goBack()}}
            />

            <Button
              variant="btn-primary"
              size="btn-medium"
              content="Confirm"
            />
          </div>
        </>
    );
  }
}

export default withRouter(Confirm);
