/* global hcaptcha */

export default class HCaptchaState {
    constructor(callback, errorCallback = null) {
        this.callback = callback;
        this.errorCallback =
            errorCallback ||
            ((alertAttrs) => {
                app.alerts.show(alertAttrs);
            });
        this.widgetId = null;
    }

    render(element) {
        this.widgetId = hcaptcha.render(element, {
            sitekey: app.data['ralkage-hcaptcha.credentials.site'],
            theme: app.forum.attribute('hCaptchaDarkMode') ? 'dark' : 'light',
            type: app.data['ralkage-hcaptcha.type'],
            size: app.data['ralkage-hcaptcha.type'] === 'invisible' ? 'invisible' : 'normal',
            callback: this.callback,
            'error-callback': () => {
                this.errorCallback({
                    type: 'error',
                    content: app.translator.trans('ralkage-hcaptcha.forum.error'),
                });
            },
        });
    }

    getResponse() {
        return hcaptcha.getResponse(this.widgetId);
    }

    execute() {
        return hcaptcha.execute(this.widgetId);
    }

    reset() {
        return hcaptcha.reset(this.widgetId);
    }
}
