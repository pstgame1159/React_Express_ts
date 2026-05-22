import { types, Instance } from 'mobx-state-tree';
import { AuthStore } from './AuthStore';

export const RootStore = types.model('RootStore', {
  auth: types.optional(AuthStore, {}),
});

export type IRootStore = Instance<typeof RootStore>;
