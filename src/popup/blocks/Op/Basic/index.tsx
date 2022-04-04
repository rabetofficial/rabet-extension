import React from 'react';
import Card from 'popup/components/common/Card';
import { ElementOption, Usage } from 'popup/models';
import ScrollBar from 'popup/components/common/ScrollBar';
import SelectOption from 'popup/components/common/SelectOption';

import Swap from './Swap';
import Send from './Send';

type AppProps = {
  modes: ElementOption[];
  selected: ElementOption;
  onChange: (e: ElementOption) => void;
  usage: Usage;
};

const BasicOp = ({ modes, onChange, selected, usage }: AppProps) => (
  <ScrollBar isHidden maxHeight={usage === 'extension' ? 384 : 1000}>
    <div
      style={{ maxWidth: usage === 'extension' ? '328px' : '460px' }}
    >
      <Card type="secondary" className="px-[11px] py-[15px]">
        <SelectOption
          defaultValue={modes[0]}
          variant="default"
          items={modes}
          onChange={onChange}
          selected={selected}
          isSearchable={false}
        />
        <div style={{ maxWidth: usage === 'extension' && '360px' }}>
          {selected.value === 'swap' ? (
            <Swap usage={usage} />
          ) : (
            <Send usage={usage} />
          )}
        </div>
      </Card>
    </div>
  </ScrollBar>
);
export default BasicOp;
