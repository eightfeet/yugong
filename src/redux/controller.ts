import { createModel } from '@rematch/core';
import { RootModel } from './models';

export const controller = createModel<RootModel>()({
    state: {
        stateTag: false,
        isEditing: false,
        editingId: '',
        unit: 'px'
    } as {
        stateTag?: boolean;
        isEditing?: boolean;
        editingId?: string;
        unit?: string;
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
        }
    },
});
