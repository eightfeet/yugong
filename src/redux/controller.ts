import { createModel } from '@rematch/core';
import { RootModel } from './models';

export const controller = createModel<RootModel>()({
    state: {
        stateTag: false,
        isEditing: false,
        unit: 'px'
    } as {
        stateTag?: boolean;
        isEditing?: boolean;
        unit?: string;
    }, // typed complex state
    reducers: {
        setStateTag(state, payload: boolean) {
            return { ...state, stateTag: payload };
        },
        setIsEditing(state, payload: boolean) {
            return { ...state, isEditing: payload };
        },
        setUnit(state, payload: string) {
            return { ...state, unit: payload };
        }
    },
});
