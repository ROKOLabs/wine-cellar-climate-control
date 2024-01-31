import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './browserRouter';

export const Router = () => <RouterProvider router={browserRouter} />;
