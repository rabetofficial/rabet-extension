import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Note from 'Root/components/Note';
import CopyText from 'Root/components/CopyText';
import Button from 'Root/components/Button';
import styles from './styles.less';

const NoteCard = ({title, icon, iconClass, message, copy, btnText, ...props}) => {
  return (
      <div className="flex-parent content" style={ {marginTop: '87px'} }>
        <Note>
          <h1 className={ styles.title }>
                <span className={ classNames(styles.iconContainer, iconClass) }>
                  <span className={ icon } /></span>
            {title}
          </h1>
          <p className={ styles.msg }>
            {message}{' '}{copy && <CopyText text={ message } />}
          </p>
          <Button
            variant="btn-outlined"
            content={ btnText }
            size="btn-small"
            className={ styles.btn }
            delayHide={ 500 }
            onClick={props.handleClick}
          />
        </Note>
      </div>
  );
};

NoteCard.defaultProps = {
  copy: false,
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  copy: PropTypes.bool,
  btnText: PropTypes.string.isRequired,
};

export default NoteCard;
