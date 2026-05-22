import { types, flow, Instance } from 'mobx-state-tree';
import { loginApi, getMeApi } from '../api/auth';

const UserModel = types.model('User', {
  id: types.number,
  username: types.string,
  role: types.enumeration('UserRole', ['MANAGER', 'TEAMLEADER', 'FLOORSTAFF']),
  created_at: types.string,
});

export const AuthStore = types
  .model('AuthStore', {
    user: types.maybeNull(UserModel),
    token: types.maybeNull(types.string),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get isAuthenticated() {
      return self.token !== null && self.user !== null;
    },
    get role() {
      return self.user?.role ?? null;
    },
  }))
  .actions((self) => ({
    logout() {
      self.user = null;
      self.token = null;
      self.error = null;
      localStorage.removeItem('token');
    },
    login: flow(function* (username: string, password: string) {
      self.loading = true;
      self.error = null;
      try {
        const result: { token: string; user: Instance<typeof UserModel> } =
          yield loginApi(username, password);
        self.token = result.token;
        self.user = result.user;
        localStorage.setItem('token', result.token);
      } catch (err: unknown) {
        const serverMessage =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'เข้าสู่ระบบไม่สำเร็จ';
        const translatedMessage =
          serverMessage === 'Invalid username or password'
            ? 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
            : serverMessage === 'Login failed'
              ? 'เข้าสู่ระบบไม่สำเร็จ'
              : serverMessage;
        self.error = translatedMessage;
        throw err;
      } finally {
        self.loading = false;
      }
    }),
    loadFromStorage: flow(function* () {
      const token = localStorage.getItem('token');
      if (!token) return;
      self.token = token;
      try {
        const user: Instance<typeof UserModel> = yield getMeApi();
        self.user = user;
      } catch {
        self.token = null;
        localStorage.removeItem('token');
      }
    }),
  }));

export type IAuthStore = Instance<typeof AuthStore>;
