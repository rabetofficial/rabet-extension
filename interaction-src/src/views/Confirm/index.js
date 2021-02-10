import shortid from 'shortid';
import classNames from 'classnames';
import React, {Component} from 'react';

import Card from 'Root/components/Card';
import Button from 'Root/components/Button';
import CopyText from 'Root/components/CopyText';
import PageTitle from 'Root/components/PageTitle';

import styles from './styles.less';

class Confirm extends Component {

  render() {

    return (
        <>
          <div className={ classNames(styles.confirm, 'hidden-scroll content-scroll') }>
            <PageTitle status="Confirm" statusTitle="network" />

            <div className="content">
              <p className={ styles.source }>
                <span className={ styles.sourceTitle }>Source account:</span>
                <span className={ styles.sourceValue }>
                  <CopyText text="GAMMnonojnVS3O" button="GAMMnonojnVS3O" />
                </span>
              </p>
                <div className={ styles.box } key={shortid.generate()}>
                    <Card type="card-secondary">
                        <h1>title</h1>
                        <div>
                            <h2 className={ styles.valueTitle }>title2</h2>
                            <p className={ styles.value }>text</p>
                            <p className="error">
                                <span className="icon-exclamation-circle"/>{' '}error
                            </p>
                        </div>
                    </Card>
                </div>
                <Card type="card-secondary">
                <h1 className={styles.title}>Memo</h1>
                   <p className={ styles.value }>memo text</p>
                </Card>

            </div>
          </div>
          <div className={ classNames('pure-g justify-end', styles.buttons) }>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Reject"
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

export default Confirm;
