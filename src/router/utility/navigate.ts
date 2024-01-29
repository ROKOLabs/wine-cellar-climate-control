import { browserRouter } from '../browserRouter';

type Args = Parameters<(typeof browserRouter)['navigate']>;

export const navigate = (...args: Args) => browserRouter.navigate(...args);
