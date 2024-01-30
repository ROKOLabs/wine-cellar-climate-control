class AuthService {
  register = async (email: string, password: string) => {};

  login = async (email: string, password: string) => {};

  logout = async () => {};
}

export const authService = new AuthService();
