import axios from 'axios';

export default {
    namespace: 'latest',
    state: {
        stories: [],
        view: 'home'
    },
    reducers: {
        created(state, { payload }) {
            return {
                ...state,
                stories: payload.stories
            };
        },
        setView(state, { payload }) {
            return {
                ...state,
                view: payload.view
            };
        }
    },
    effects: {
        *createdAsync({ payload }, { put }) {
            const data = yield axios.get('/api/latest').then(res => res.data)
            yield put({ type: 'created', payload:data });
        }
    }
};
