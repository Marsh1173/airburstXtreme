import { requestName } from '../MiscFuncs/LoadName';
import { GlobalInfo } from '../Model/GlobalInfo/GlobalInfo';
import { MessageReceiver } from '../Model/ServerHandling/MessageReceiver';
import { ServerTalker } from '../Model/ServerHandling/ServerTalker';
import { BrowserPresenter } from './BrowserPresenter';

export class HomePresenter {
    public static changeHomeComponentView?: (val: string) => void;
    private static showErrorFunc?: (val: string) => void;
    public static onPressBackToHome() {
        if (HomePresenter.changeHomeComponentView) {
            HomePresenter.changeHomeComponentView('home');
        }
    }

    public static setShowErrorFunc(func: ((val: string) => void) | undefined) {
        HomePresenter.showErrorFunc = func;
    }
    public static showError(val: string) {
        if (HomePresenter.showErrorFunc) {
            HomePresenter.showErrorFunc(val);
        }
    }
    public static showConnectionError() {
        if (HomePresenter.showErrorFunc) {
            HomePresenter.showErrorFunc('Connection error - try refreshing.');
        }
    }

    public static async initializeServer() {
        ServerTalker.serverTalker = new ServerTalker(new MessageReceiver());
        ServerTalker.serverTalker.connect();
    }

    public static onPressChangeName() {
        requestName(GlobalInfo.playerInfo.name);
    }
}
