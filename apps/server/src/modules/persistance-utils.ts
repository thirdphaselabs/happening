import { PrismaClient } from "@template/database";
import { protectedProcedure } from "../trpc/procedures";

export type ProtectedPersistanceCallArgs = Parameters<Parameters<typeof protectedProcedure.query>["0"]>[0];

export function protectedPersistanceCall<T extends ProtectedPersistanceCallArgs, R>(
  persistanceFunction: (args: T) => R,
): (args: T) => R {
  return function (args: T): R {
    return persistanceFunction(args);
  };
}

// Define a generic type for service functions. These functions take an argument of type T
// and return a value of type Promise<R> to accommodate asynchronous operations.
type PersistanceFunction<Args extends ProtectedPersistanceCallArgs, ReturnType> = (args: Args) => ReturnType;

// Define the Service type as a record where each key is a string representing the service name,
// and the value is a ServiceFunction with potentially unique argument and return types.
// This uses a mapped type with a conditional type to enforce the pattern for all service functions.
export type Persistance<T = any> = {
  [K in keyof T]: T[K] extends PersistanceFunction<infer Args, infer ReturnType>
    ? PersistanceFunction<Args, ReturnType>
    : never;
};
