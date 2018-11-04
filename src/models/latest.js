import axios from 'axios';

export default {
    namespace: 'latest',
    state: {
        stories: [],
        view: 'home',
        getMore: true
    },
    reducers: {
        created(state, { payload }) {
            return {
                ...state,
                stories: [...state.stories, ...payload]
            };
        },
        setView(state, { payload }) {
            return {
                ...state,
                view: payload.view
            };
        },
        handleGetMore(state, { payload }) {
            return {
                ...state,
                getMore: payload
            };
        }
    },
    effects: {
        //获得今天新闻
        *createdAsync({ payload }, { put }) {
            const data = yield axios.get('http://hanzhibang.cn/zhihu/api/latest').then(res => res.data);

            const date = {today:'今日'}

            yield put({ type: 'created', payload: [date,...data.stories] });
        },
        //获得过往新闻
        *getLastDataAsync({ payload }, { put }) {
            const year = payload.year;
            const month = payload.month;
            const day = payload.day;

            const date = { year, month, day };

            const data = yield axios.get(`http://hanzhibang.cn/zhihu/api/before/${year}${month}${day}`).then(res => res.data);
            yield put({ type: 'handleGetMore', payload: true });
            yield put({ type: 'created', payload: [date, ...data.stories] });
        }
    }
};
