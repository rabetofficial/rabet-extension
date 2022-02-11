import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState } from 'popup/reducers';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
