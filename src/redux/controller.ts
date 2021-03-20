import { createModel } from '@rematch/core';
import { RootModel } from './models';

export const controller = createModel<RootModel>()({
    state: {
        stateTag: false,
        isEditing: false,
        editingId: '',
        unit: 'px',
        toUnit: 'rem',
    } as {
        stateTag?: boolean;
        isEditing?: boolean;
        editingId?: string;
        unit?: string;
        toUnit?: string;
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
        setUnit(state, payload: string) {
            return { ...state, unit: payload };
        },
        setToUnit(state, payload: string) {
            return { ...state, toUnit: payload };
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
