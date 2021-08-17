import { get } from '../../helpers/storage';

export default async (password) => {
  try {
    await get('data', password);

    return true;
  } catch (e) {
    return false;
  }
};
