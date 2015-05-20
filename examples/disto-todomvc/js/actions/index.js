import {Dis, act} from 'disto';

export const dis = new Dis();
export const $ =  act(dis.dispatch, {
    create: '',
    updateText: '',
    toggleComplete: '',
    toggleComplteAll: '',
    destory: '',
    destroyCompleted: ''
});

