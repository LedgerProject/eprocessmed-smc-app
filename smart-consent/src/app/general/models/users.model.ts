export class Users {
  constructor(
    public usr_id: number,
    public doc_id: string,
    public google_id: string,
    public phone: string,
    public code: number,
    public name: string,
    public password: string,
    public email: string,
    public role: string,
    public provider: string,
    public status: boolean,
    public created_on: string
  ) { }
}
