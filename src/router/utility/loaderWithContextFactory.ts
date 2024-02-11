export function loaderWithContextFactory<const T>(context: T) {
  return function <R>({ loader }: { loader: (props: { context: T }) => R }) {
    return () => loader({ context });
  };
}
