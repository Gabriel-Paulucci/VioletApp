import { Config } from "@/config";
import { DateTime } from "luxon";

export interface App {
  id: number;
  name: string;
  owner: string;
}

export interface Token {
  token: string;
}

export interface AppToken {
  token: string;
  appId: number;
  permitCors: boolean;
  subappName: string | null;
  newToken: boolean;
}

export interface AppError {
  id: number;
  appId: number;
  errorLevel: string;
  message: string;
  stackTrace: string | null;
  createdAt: DateTime;
  subappName: string | null;
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

  public async login(
    username: string,
    password: string
  ): Promise<Token | undefined> {
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
  ): Promise<boolean> {
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

  public async newApp(name: string): Promise<App | undefined> {
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

  public async getApps(): Promise<App[]> {
    try {
      const request = await fetch(`${this.baseUrl}/apps`, {
        ...this.baseConfig,
        method: "GET",
      });

      switch (request.status) {
        case 200: {
          const response: App[] = await request.json();
          return response;
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
      throw new Error("Failed to get apps");
    }
  }

  public async getAppTokens(appId: number): Promise<AppToken[]> {
    try {
      const request = await fetch(`${this.baseUrl}/apps/${appId}/tokens`, {
        ...this.baseConfig,
        method: "GET",
      });

      switch (request.status) {
        case 200: {
          interface Response {
            app_id: number;
            token: string;
            permit_cors: boolean;
            subapp_name: string | null;
          }

          const response: Response[] = await request.json();

          return response.map<AppToken>((token) => ({
            appId: token.app_id,
            permitCors: token.permit_cors,
            subappName: token.subapp_name,
            token: token.token,
            newToken: false,
          }));
        }
        case 404: {
          throw new Error("App not found");
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
      throw new Error("Failed to get app tokens");
    }
  }

  public async createAppToken(
    appId: number,
    name: string,
    cors: boolean
  ): Promise<AppToken> {
    try {
      const request = await fetch(`${this.baseUrl}/apps/${appId}/tokens`, {
        ...this.baseConfig,
        body: JSON.stringify({ subapp_name: name, permit_cors: cors }),
        method: "POST",
      });

      switch (request.status) {
        case 201: {
          interface Response {
            app_id: number;
            token: string;
            permit_cors: boolean;
            subapp_name: string | null;
          }
          const response: Response = await request.json();
          return {
            appId: response.app_id,
            permitCors: response.permit_cors,
            subappName: response.subapp_name,
            token: response.token,
            newToken: true,
          };
        }
        case 401: {
          throw new Error("Unauthorized");
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
      throw new Error("Failed to create app token");
    }
  }

  public async getAppErrors(appId: number): Promise<AppError[]> {
    try {
      const request = await fetch(`${this.baseUrl}/apps/${appId}/errors`, {
        ...this.baseConfig,
        method: "GET",
      });

      switch (request.status) {
        case 200: {
          interface Response {
            id: number;
            app_id: number;
            error_level: string;
            message: string;
            stack_trace: string | null;
            created_at: number;
            subapp_name: string | null;
          }

          const response: Response[] = await request.json();

          return response.map<AppError>((error) => ({
            appId: error.app_id,
            createdAt: DateTime.fromSeconds(error.created_at),
            errorLevel: error.error_level,
            stackTrace: error.stack_trace,
            subappName: error.subapp_name,
            id: error.id,
            message: error.message,
          }));
        }
        case 404: {
          throw new Error("App not found");
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
      throw new Error("Failed to get app errors");
    }
  }
}
