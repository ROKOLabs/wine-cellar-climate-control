import { router } from 'router/routes';

type Args = Parameters<(typeof router)['navigate']>;

/**
 * Navigate to a new location using the router instance outside of react components.
 * For usage inside react components use useNavigate hook from react-router-dom instead
 * @param args - arguments passed to router.navigate
 * @returns void
 */
export const navigate = (...args: Args) => router.navigate(...args);
