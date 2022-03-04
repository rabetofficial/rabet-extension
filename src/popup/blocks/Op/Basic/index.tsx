import React from 'react';

import Card from 'popup/components/common/Card';
import SelectOption from 'popup/components/common/SelectOption';
import ScrollBar from 'popup/components/common/ScrollBar';
import { ElementOption, Usage } from 'popup/models';
import Swap from './Swap';
import Send from './Send';

type AppProps = {
  modes: ElementOption[];
  selected: ElementOption;
  onChange: (e: ElementOption) => void;
  usage: Usage;
};

const BasicOp = ({ modes, onChange, selected, usage }: AppProps) => (
  <ScrollBar isHidden maxHeight={usage === 'extension' ? 380 : 1000}>
    <Card type="secondary" className="px-[11px] py-[15px]">
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
