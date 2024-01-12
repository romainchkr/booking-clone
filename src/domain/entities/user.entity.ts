export interface IUser {
  id: string;
  name: string;
  email: string;
  picture?: string | null;
}

export class User implements IUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly picture?: string | null;

  constructor({id, name, email, picture}: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.picture = picture !== undefined ? picture : null;
  }
}