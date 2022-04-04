import { Config } from "@/config";

export interface App {
  id: string;
  name: string;
  owner: string;
}

export interface Token {
  token: string;
}

export class VioletApi {
  private baseConfig: RequestInit;
  private baseUrl: string;

  constructor(config: Config) {
    this.baseConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.baseUrl = config.apiUrl;
  }

  public setToken(token: string) {
    this.baseConfig.headers = {
      ...this.baseConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  public async login(username: string, password: string) {
    try {
      const request = await fetch(`${this.baseUrl}/auth/login`, {
        ...this.baseConfig,
        body: JSON.stringify({ username, password }),
        method: "POST",
      });

      switch (request.status) {
        case 200: {
          const response: Token = await request.json();
          this.setToken(response.token);
          localStorage.setItem("token", response.token);
          return response;
        }
        case 401: {
          return;
        }
        case 500: {
          throw new Error("Internal server error");
        }
        default:
          console.log(request.status);
          throw new Error("Unknown error");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to login");
    }
  }

  public async register(
    username: string,
    password: string,
    repeatPassword: string
  ) {
    try {
      const request = await fetch(`${this.baseUrl}/auth/singup`, {
        ...this.baseConfig,
        body: JSON.stringify({
          username,
          password,
          repeat_password: repeatPassword,
        }),
        method: "POST",
      });

      switch (request.status) {
        case 200: {
          return true;
        }
        case 409: {
          return false;
        }
        case 500: {
          throw new Error("Internal server error");
        }
        default:
          console.log(request.status);
          throw new Error("Unknown error");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to register");
    }
  }

  public async newApp(name: string) {
    try {
      const request = await fetch(`${this.baseUrl}/apps`, {
        ...this.baseConfig,
        body: JSON.stringify({ name }),
        method: "POST",
      });

      switch (request.status) {
        case 200: {
          const response: App = await request.json();
          return response;
        }
        case 422: {
          return;
        }
        case 500: {
          throw new Error("Internal server error");
        }
        default:
          console.log(request.status);
          throw new Error("Unknown error");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create app");
    }
  }
}
