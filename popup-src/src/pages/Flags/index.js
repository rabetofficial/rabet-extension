import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import ToggleSwitch from 'Root/components/ToggleSwitch';
import Tooltip from 'Root/components/Tooltip';
import Button from 'Root/components/Button';
import styles from './styles.less';

class Flags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRequired: false,
      checkedRevocable: true,
      checkedImmutable: false,
    };
    this.handleCheckedRequired = this.handleCheckedRequired.bind(this);
    this.handleCheckedRevocable = this.handleCheckedRevocable.bind(this);
    this.handleCheckedImmutable = this.handleCheckedImmutable.bind(this);
  }

  handleCheckedRequired(checked) { this.setState({checkedRequired: checked}); }
  handleCheckedRevocable(checked) {this.setState({checkedRevocable: checked});}
  handleCheckedImmutable(checked) {this.setState({checkedImmutable: checked});}

  render() {
    return (
        <div className={ styles.page }>
          <Header/>
          <PageTitle title="Flags" />
          <div className="content">
            <h6 className={ styles.title }>
              Currently, there are three flags, used by issuers of assets.
              in below you can see your flags status:
            </h6>
            <div className={ classNames('pure-g', styles.div, styles.first) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization required
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>
              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.checkedRequired }
                  handleChange={ this.handleCheckedRequired }
                />
              </div>
            </div>
            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization revocable
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>
              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.checkedRevocable }
                  handleChange={ this.handleCheckedRevocable }
                />
              </div>
            </div>
            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization immutable
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>
              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.checkedImmutable }
                  handleChange={ this.handleCheckedImmutable }
                />
              </div>
            </div>
            <div className={ classNames('pure-g justify-end', styles.buttons) }>
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
              />
              <Button
                variant="btn-primary"
                size="btn-medium"
                content="Save"
              />
            </div>
          </div>

        </div>
    );
  }
}

Flags.propTypes = {};

export default Flags;
