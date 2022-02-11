import { get } from 'helpers/storage';

export default async (password: string): Promise<boolean> => {
  try {
    await get('data', password);

    return true;
  } catch (e) {
    return false;
  }
};
