declare module 'jsonparse' {
  export class Parser {
    onValue: (value: unknown) => void;
    onError: (err: Error) => void;
    write: (data: string) => void;
    stack: any;
  }
}
