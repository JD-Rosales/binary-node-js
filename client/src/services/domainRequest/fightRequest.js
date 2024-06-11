import { post, get } from '../requestHelper';

const entity = 'fights';

export const createFight = async (body) => {
  return await post(entity, body);
};

export const getFights = async () => {
  return await get(entity);
};
