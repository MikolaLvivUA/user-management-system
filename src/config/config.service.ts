import { getSafeEnv } from 'src/common/utils';

export const getConfig = () => {
  return {
    port: getSafeEnv('PORT'),
  };
};
