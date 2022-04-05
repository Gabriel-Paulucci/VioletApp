export class Config {
  apiUrl: string;

  constructor() {
    this.apiUrl = process.env.VUE_APP_API_URL ?? "http://localhost:3000";
  }
}
