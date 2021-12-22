import { GlobalInfo } from '../Model/GlobalInfo/GlobalInfo';
import { forceGetInputString } from './getInputString';

export function loadName() {
    let name: string | null = localStorage.getItem('name');

    if (name != null) {
        GlobalInfo.playerInfo.name = name;
    } else {
        requestName();
    }
}

export const requestName = (defVal: string = 'Player' + Math.ceil(Math.random() * 100000)) => {
    let newName: string = forceGetInputString('Enter your name:', defVal);
    setName(newName);
};

function setName(val: string) {
    GlobalInfo.playerInfo.name = val;
    localStorage.setItem('name', val);
}
