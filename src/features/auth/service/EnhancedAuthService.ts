import { User } from 'features/auth/authSlice';
import { AuthService, LoginParams } from 'features/auth/service/AuthService';
import { DbService } from 'features/db/DbService';

type WithPassword<T> = T & { password: string };
type OnAuthStateChangedParams = Parameters<AuthService['onAuthStateChanged']>;
type UpdateUserProfileParams = Parameters<AuthService['updateUserProfile']>;

export class EnhancedAuthService {
  static #instance: EnhancedAuthService;
  #authService: AuthService;
  #dbService: DbService;

  private constructor(authService: AuthService, dbService: DbService) {
    this.#authService = authService;
    this.#dbService = dbService;
  }

  static getInstance(authService: AuthService, dbService: DbService) {
    if (!EnhancedAuthService.#instance) {
      EnhancedAuthService.#instance = new EnhancedAuthService(
        authService,
        dbService,
      );
    }
    return EnhancedAuthService.#instance;
  }

  // Enhanced methods for AuthService

  register = async (props: WithPassword<User>) => {
    const { email, password, name, lastname, username } = props;
    const { user } = await this.#authService.register({ email, password });

    const details = { email, name, lastname, username };
    await this.#dbService.setUserDetails(user.uid, details);

    const displayName = `${name[0]}${lastname[0]}`;
    await this.#authService.updateUserProfile({ displayName });
  };

  // Exported from AuthService

  login = (arg: LoginParams) => {
    return this.#authService.login(arg);
  };

  logout = () => {
    return this.#authService.logout();
  };

  onAuthStateChanged = (...args: OnAuthStateChangedParams) => {
    return this.#authService.onAuthStateChanged(...args);
  };

  updateUserProfile = (...args: UpdateUserProfileParams) => {
    return this.#authService.updateUserProfile(...args);
  };
}
