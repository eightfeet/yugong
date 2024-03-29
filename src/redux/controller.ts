import { createModel } from '@rematch/core';
import { loginOut, userSync } from '~/api';
import produce from '~/core/helper/produce';
import loading from '~/core/loading';
import { RootModel } from './models';

interface Auth {
  isLogin?: boolean,
  session?: { id?: number, username?: string }
}

const defaultData: {
  stateTag?: boolean;
  isEditing?: boolean;
  editingId?: string;
  bestFont?: number;
  currentEditorStylePath?: any[];
  auth?: Auth
} = {
  stateTag: false,
  isEditing: false,
  editingId: '',
}

export const controller = createModel<RootModel>()({
  state: defaultData, // typed complex state
  reducers: {
    setStateTag: (state, payload: boolean) => produce(state, draft => { draft.stateTag = payload }),
    setIsEditing: (state, payload: boolean) => produce(state, draft => { draft.isEditing = payload }),
    setEditingId: (state, payload: string) => produce(state, draft => { draft.editingId = payload }),
    setBestFont: (state, payload: number) => produce(state, draft => { draft.bestFont = payload }),
    setCurrentEditorStylePath: (state, payload: any[]) => produce(state, draft => { draft.currentEditorStylePath = payload }),
    initController: (state) => produce(defaultData, draft => { draft.auth = state.auth }),
    setAuth: (state, payload: Auth) => produce(state, draft => { draft.auth = payload })
  },
  effects: (dispatch) => {
    return {
      forceUpdateByStateTag: async () => {
        await new Promise<void>(resolve => setTimeout(() => {
          dispatch.controller.setStateTag(true);
          resolve();
        }))
        dispatch.controller.setStateTag(false);
      },

      loginOut: async () => {
        loading.show()
        try {
          await loginOut();
          dispatch.controller.setAuth({
            isLogin: false,
            session: {}
          })
          loading.hide()
        } catch (error) {
          loading.hide()
          throw error
        }
      },

      userSync: async () => {
        const res = await userSync();
        if (res.username) {
          dispatch.controller.setAuth({
            isLogin: true,
            session: res
          })
        }
      },
    }
  }
});
