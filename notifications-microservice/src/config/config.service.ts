import { getSafeEnv } from './get-safe-env.utils';

export const getConfig = () => {
  return {
    port: getSafeEnv('PORT'),
  };
};
