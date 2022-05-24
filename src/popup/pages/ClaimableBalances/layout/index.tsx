import React from 'react';

import Card from 'popup/components/common/Card';
import Button from 'popup/components/common/Button';
import SelectOption from 'popup/components/common/SelectOption';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import ShortRightArrow from 'popup/svgs/ShortRightArrow';

import * as S from './styles';

const Layout = () => {
  const onChange = () => {
    console.log('hey');
  };

  const modes = ['All', 'Claimable', 'On hold', 'Expired'];

  const Info = () => (
    <>
      <div>
        <S.InfoTitle>Amount</S.InfoTitle>
        <S.Info>540 XLM</S.Info>
      </div>
      <div className="mt-4">
        <S.InfoTitle>Period</S.InfoTitle>
        <S.Info>
          <p>5 Feb 2022</p>
          <span className="m-2.5">
            <ShortRightArrow />
          </span>
          <p>12 Feb 2022</p>
        </S.Info>
      </div>
    </>
  );

  const Claimable = () => (
    <Card type="secondary" className="my-4 py-4 px-[11px]">
      <Info />
      <ButtonContainer btnSize={90} justify="end" mt={24}>
        <Button variant="primary" content="Claim" size="medium" />
      </ButtonContainer>
    </Card>
  );
  const Expired = () => (
    <Card type="secondary" className="my-4 py-4 px-[11px]">
      <Info />
      <ButtonContainer btnSize={90} justify="end" mt={24}>
        <Button
          style={{
            backgroundColor: '#fff4f4',
            border: '1px solid #fff4f4',
            borderRadius: '3px',
          }}
          variant="danger"
          content="Expired"
          size="medium"
        />
      </ButtonContainer>
    </Card>
  );
  const OnHold = () => (
    <Card type="secondary" className="my-4 py-4 px-[11px]">
      <Info />
      <S.Note>
        <S.Text>Will be claimable in 2 Days 3 Hours 30 Min</S.Text>
      </S.Note>
    </Card>
  );

  return (
    <div className="mt-5">
      <SelectOption
        defaultValue={modes[0]}
        variant="outlined"
        items={modes}
        onChange={onChange}
        isSearchable={false}
      />
      <Claimable />
      <Expired />
      <OnHold />
    </div>
  );
};
export default Layout;
