import { requestName } from '../MiscFuncs/LoadName';
import { GlobalInfo } from '../Model/GlobalInfo/GlobalInfo';
import { MessageReceiver } from '../Model/ServerHandling/MessageReceiver';
import { ServerTalker } from '../Model/ServerHandling/ServerTalker';
import { BrowserPresenter } from './BrowserPresenter';

export class HomePresenter {
    public static changeHomeComponentView?: (val: string) => void;
    private static showErrorFunc?: (val: string, ifBad: boolean) => void;
    public static onPressBackToHome() {
        if (HomePresenter.changeHomeComponentView) {
            HomePresenter.changeHomeComponentView('home');
        }
    }

    public static setShowErrorFunc(func: ((val: string, ifBad: boolean) => void) | undefined) {
        HomePresenter.showErrorFunc = func;
    }
    public static showError(val: string, ifBad: boolean = true) {
        if (HomePresenter.showErrorFunc) {
            HomePresenter.showErrorFunc(val, ifBad);
        }
    }
    public static showConnectionError() {
        this.showError('Connection error - try refreshing.');
    }

    public static async initializeServer() {
        ServerTalker.serverTalker = new ServerTalker(new MessageReceiver());
        ServerTalker.serverTalker.connect();
    }

    public static onPressChangeName() {
        requestName(GlobalInfo.playerInfo.name);
    }
}
