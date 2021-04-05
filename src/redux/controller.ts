import { createModel } from '@rematch/core';
import { RootModel } from './models';

export const controller = createModel<RootModel>()({
    state: {
        stateTag: false,
        isEditing: false,
        editingId: '',
    } as {
        stateTag?: boolean;
        isEditing?: boolean;
        editingId?: string;
        bestFont?: number
    }, // typed complex state
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
        }
    },
    effects: (dispatch) => {
        return {
            forceUpdateByStateTag: async () => {
                dispatch.controller.setStateTag(true)
                dispatch.controller.setStateTag(false);
            }
        }
    }
});
