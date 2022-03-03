import React from 'react';

import Card from 'popup/components/common/Card';
import SelectOption from 'popup/components/common/SelectOption';
import ScrollBar from 'popup/components/common/ScrollBar';
import { ElementOption } from 'popup/models';
import Swap from './Swap';
import Send from './Send';

type AppProps = {
  modes: ElementOption[];
  selected: ElementOption;
  onChange: (e: ElementOption) => void;
};

const BasicOp = ({ modes, onChange, selected }: AppProps) => (
  <ScrollBar isHidden maxHeight={380}>
    <Card type="secondary" className="mt-[20px] px-[11px] py-[15px]">
      <SelectOption
        defaultValue={modes[0]}
        variant="default"
        items={modes}
        onChange={onChange}
        selected={selected}
        isSearchable={false}
      />

      {selected.value === 'swap' ? <Swap /> : <Send />}
    </Card>
  </ScrollBar>
);

export default BasicOp;
