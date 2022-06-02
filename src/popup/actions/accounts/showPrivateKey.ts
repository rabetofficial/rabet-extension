import { get } from 'helpers/storage';

export default async (password: string): Promise<boolean> => {
  try {
    const accounts = await get('data', password);

    return !!accounts;
  } catch (e) {
    return false;
  }
};
