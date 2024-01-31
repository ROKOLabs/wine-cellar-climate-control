import { browserRouter } from 'router/browserRouter';

type Args = Parameters<(typeof browserRouter)['navigate']>;

export const navigate = (...args: Args) => browserRouter.navigate(...args);
