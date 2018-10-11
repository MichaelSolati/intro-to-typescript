export class Player {
  constructor(private _name: string, private _number: number) { }

  get name(): string {
    return this._name;
  }

  get number(): number {
    return this._number;
  }
}