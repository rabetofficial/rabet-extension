import React, { useState } from 'react';
import Popover from 'popup/components/common/Popover';

import * as S from './styles';

const DestinationSuggest = () => {
  const [showPopover, setShowPopover] = useState(true);
  const onHidePopover = () => setShowPopover(false);
  const parent = document.querySelector('#full');

  return (
    <Popover
      placement="bottom-start"
      visible={showPopover}
      hideFunc={onHidePopover}
      parent={parent}
    >
      <S.Container>hello</S.Container>
    </Popover>
  );
};

export default DestinationSuggest;
