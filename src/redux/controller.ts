import { createModel } from '@rematch/core';
import { RootModel } from './models';

const defaultData: {
    stateTag?: boolean;
    isEditing?: boolean;
    editingId?: string;
    bestFont?: number;
    currentEditorStylePath?: any[];
} = {
    stateTag: false,
    isEditing: false,
    editingId: '',
}

export const controller = createModel<RootModel>()({
    state: defaultData, // typed complex state
    reducers: {
        setStateTag(state, payload: boolean) {
            return { ...state, stateTag: payload };
        },
        setIsEditing(state, payload: boolean) {
            return { ...state, isEditing: payload };
        },
        setEditingId(state, payload: string) {
            return { ...state, editingId: payload };
        },
        setBestFont(state, payload: number) {
            return { ...state, bestFont: payload };
        },
        setCurrentEditorStylePath(state, payload: any[]) {
            return { ...state, currentEditorStylePath: payload };
        },
        initController(){
            return defaultData;
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
            }
        }
    }
});
