// Type definitions for immutability-helper v2.0.0
// Project: https://github.com/kolodny/immutability-helper
// Definitions by: Sean Kelley <https://github.com/seansfkelley>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare function update<T, C>(data: T, query: Query<T, C>): T;

declare namespace update {
    function newContext(): typeof update;

    function extend<T>(command: string, handler: (param: any, old: T) => T): void;
}

interface IOperators<T> {
  $toggle?: (keyof T)[];
  $set?: T;
  $unset?: string[];
  $merge?: Partial<T>;
  $apply?: (old: T) => T;
  $push?: T;
  $unshift?: T;
  $splice?: [number, number][];
}

type Tree<T, C> = {
    [K in keyof T]: IOperators<T[K]> | Partial<Tree<T[K], C>> | C;
}

interface Test<T, C> {
    [index: number]: Partial<Tree<T, C>> | C;
}

type Query<T, C> = Partial<IOperators<T> & Tree<T, C> & Test<T, C> & C>;

export = update;
