import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Tooltip from 'Root/components/Tooltip';
import PageTitle from 'Root/components/PageTitle';
import ToggleSwitch from 'Root/components/ToggleSwitch';

import styles from './styles.less';
import Button from '../../components/Button';
import SelectOption from '../../components/SelectOption';

const items = [
  {value: 'xlm', label: 'XLM'},
  {value: 'aa', label: 'AA'},
  {value: 'bb', label: 'BB'},
  {value: 'cc', label: 'CC'},
];

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      selectedNetwork: {},
      selectedTimer: {},
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeNetwork = this.onChangeNetwork.bind(this);
    this.onChangeTimer = this.onChangeTimer.bind(this);
  }
  handleChecked(checked) { this.setState({checked}); }
  onChangeNetwork(e) {this.setState({selectedNetwork: e});}
  onChangeTimer(e) {this.setState({selectedTimer: e});}


  render() {
    return (
        <div className={ styles.page }>
          <Header/>
          <PageTitle title="Setting" />
          <div className="content">
            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.title }>Network
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>
              <div className="pure-u-1-3">
                <div className={ styles.select }>
                  <SelectOption
                    items={ items }
                    onChange={ this.onChangeNetwork }
                    variant="select-outlined"
                    isSearchable={ false }
                  />
                </div>
              </div>
            </div>
            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.title }>Auto-lock timer
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>
              <div className="pure-u-1-3">
                <div className={ styles.select }>
                  <SelectOption
                    items={ items }
                    onChange={ this.onChangeTimer }
                    variant="select-outlined"
                    isSearchable={ false }
                  />
                </div>
              </div>
            </div>
            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.title }>Privacy mode
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>
              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.checked }
                  handleChange={ this.handleChecked }
                />
              </div>
            </div>
            <div className={ classNames('pure-g justify-end', styles.buttons) }>
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
                onClick={() => {this.props.history.goBack()}}
              />
              <Button
                variant="btn-primary"
                size="btn-medium"
                content="Save"
              />
            </div>
          </div>
          <p className={ styles.version }>Version 1.1.4</p>
        </div>
    );
  }
}

export default withRouter(Setting);
