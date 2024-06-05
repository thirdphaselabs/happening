export function exponentialBackOff<T>({
  retries = 3,
  delay = 1000,
  callback,
}: {
  retries?: number;
  delay?: number;
  maxDelay?: number;
  backOff?: number;
  callback: (retry: number) => Promise<T>;
}): Promise<T> {
  return new Promise((resolve, reject) => {
    const next = (retry: number) => {
      setTimeout(() => {
        callback(retry)
          .then(resolve)
          .catch((error) => {
            if (retry > 0) {
              next(retry - 1);
            } else {
              reject(error);
            }
          });
      }, delay);
    };

    next(retries);
  });
}
