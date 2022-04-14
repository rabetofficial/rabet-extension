import React from 'react';
import { Link } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import { Swap, Send, Receive } from 'popup/svgs/TransactionActions';

const Links = () => {
  const { mode } = useTypedSelector((store) => store.options);

  const isAdvanced = mode === 'ADVANCED';

  return (
    <div className="flex justify-center align-center mt-2">
      {isAdvanced ? (
        <>
          <Link to={RouteName.AdvancedOperation}>
            <Button
              iconBtn
              size="small"
              variant="icon-circle"
              content={
                <span>
                  <Send size="16" />
                </span>
              }
              title="Send"
            />
          </Link>

          <Link to={RouteName.QRCode}>
            <Button
              iconBtn
              size="small"
              variant="icon-circle"
              content={
                <span>
                  <Receive size="16" />
                </span>
              }
              title="Receive"
            />
          </Link>
        </>
      ) : (
        <>
          <Link to={RouteName.SendExtension}>
            <Button
              iconBtn
              size="small"
              variant="icon-circle"
              content={
                <span>
                  <Send size="16" />
                </span>
              }
              title="Send"
            />
          </Link>

          <Link to={RouteName.SwapExtension}>
            <Button
              size="small"
              variant="icon-circle"
              content={
                <span>
                  <Swap width="18" height="19" />
                </span>
              }
              iconBtn
              title="Swap"
            />
          </Link>

          <Link to={RouteName.QRCode}>
            <Button
              size="small"
              variant="icon-circle"
              content={
                <span>
                  <Receive size="16" />
                </span>
              }
              iconBtn
              title="Receive"
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default Links;
