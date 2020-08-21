import React, {Component} from 'react';
import classNames from 'classnames';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import Button from 'Root/components/Button';
import styles from './styles.less';

const assetInfo = [
  {title: 'Assets code', value: 'USD'},
  {title: 'Issuer', value: 'GDTYMQRK2SUSIDEIHZBXCQ3TVCCHLPCDN7VWGY7KPW5AXFNFNIPZ4T7B'},
  {title: 'Website', value: 'www.sample.com'},
  {title: 'Assets type', value: 'Credit_alphanum 4'},
];

const deleteBtn = <><span className="icon-trash" />{''}Delete</>;

class Assets extends Component {
  render() {
    return (
        <>
          <div className={ classNames(styles.page, 'hidden-scroll content-scroll') }>
            <Header/>
            <PageTitle title="Assets | USD" />
            <div className="content">
              {assetInfo.map((item, index) => (
                  <div key={ index } className={ styles.assets }>
                    <h4 className={ styles.title }>{item.title}</h4>
                    <p className={ styles.value }>{item.value}</p>
                    {((assetInfo.length - 1) !== index) && <hr className={ styles.hr }/>}
                  </div>
              ))}
              <div className={ styles.table }>
                <table>
                  <thead>
                  <tr>
                    <th>Required</th>
                    <th>Revocable</th>
                    <th>Immutable</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>True</td>
                    <td>False</td>
                    <td>False</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={ classNames('pure-g justify-end', styles.buttons) }>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Cancel"
            />
            {/*<Button*/}
            {/*  variant="btn-primary"*/}
            {/*  size="btn-medium"*/}
            {/*  content="Add"*/}
            {/*/>*/}
            <Button
              type="button"
              variant="btn-danger"
              size="btn-medium"
              content={ deleteBtn }
            />
          </div>
        </>
    );
  }
}

export default Assets;
