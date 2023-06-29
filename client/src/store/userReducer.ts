import {User} from "../interfaces/UserCardInterface";
import {ScoresType} from "../interfaces/ScoresInterface";

export const ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

declare interface UserStateType {
    loading: boolean,
    error: boolean,
    data: User | undefined;
}

declare interface ScoresStateType {
    loading: boolean,
    error: boolean,
    data: ScoresType | undefined;
}

export const USER_INITIAL_STATE: UserStateType = {
    loading: false,
    error: false,
    data: undefined
}
export const SCORES_INITIAL_STATE: ScoresStateType = {
    loading: false,
    error: false,
    data: undefined
}

export const userReducer = (state: any, action: any): UserStateType => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                data: undefined
            }
        case ACTION_TYPES.FETCH_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload
            }
        case ACTION_TYPES.FETCH_ERROR:
            return {
                loading: false,
                error: true,
                data: undefined
            }
        default:
            return state;
    }
}

export const scoresReducer = (state: any, action: any): ScoresStateType => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                data: undefined
            }
        case ACTION_TYPES.FETCH_SUCCESS:
            return {
                loading: false,
                error: false,
                data: {
                    pinned: {
                        items: action.payload[0],
                        pagination: {
                            hasMore: false
                        },
                        count: 0
                    },
                    firsts: {
                        items: action.payload[1],
                        pagination: {
                            hasMore: false
                        },
                        count: 0
                    },
                    best: {
                        items: action.payload[2],
                        pagination: {
                            hasMore: false
                        },
                        count: 0
                    },
                    recent: {
                        items: action.payload[3],
                        pagination: {
                            hasMore: false
                        },
                        count: 0
                    }
                }
            }
        case ACTION_TYPES.FETCH_ERROR:
            return {
                loading: false,
                error: true,
                data: undefined
            }
        default:
            return state;
    }
}