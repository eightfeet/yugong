import { createModel } from '@rematch/core';
import { loginOut, userSync } from '~/api';
import produce from '~/core/helper/produce';
import { RootModel } from './models';

interface Auth {
    isLogin?: boolean,
    session?: {id?: number, username?: string}
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
        setStateTag(state, payload: boolean) {
            return produce(state, draft => draft.stateTag = payload);
        },
        setIsEditing(state, payload: boolean) {
            return produce(state, draft => draft.isEditing = payload);
        },
        setEditingId(state, payload: string) {
            return produce(state, draft => draft.editingId = payload);
        },
        setBestFont(state, payload: number) {
            return { ...state, bestFont: payload };
        },
        setCurrentEditorStylePath(state, payload: any[]) {
            return { ...state, currentEditorStylePath: payload };
        },
        initController(state){
            // 保留用户信息
            return { ...defaultData, auth: state.auth};
        },
        setAuth(state, payload: Auth){
            return { ...state, auth: payload}
        }
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
                await loginOut();
                dispatch.controller.setAuth({
                    isLogin: false,
                    session: {}
                })
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
