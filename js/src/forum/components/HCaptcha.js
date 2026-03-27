import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

function loadHCaptchaScript() {
    if (app.hcaptchaLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://hcaptcha.com/1/api.js?hl=${app.translator.locale}&render=explicit`;
        script.async = true;
        script.onload = () => {
            app.hcaptchaLoaded = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export default class HCaptcha extends Component {
    view() {
        return (
            <div className="Form-group">
                <div className="h-captcha" />
            </div>
        );
    }

    oncreate(vnode) {
        super.oncreate(vnode);

        loadHCaptchaScript().then(() => {
            const interval = setInterval(() => {
                if (window.hcaptcha) {
                    clearInterval(interval);
                    this.attrs.state.render(vnode.dom.querySelector('.h-captcha'));
                }
            }, 250);
        });

        if (app.data['ralkage-hcaptcha.type'] === 'invisible') {
            const iframe = vnode.dom.querySelector('iframe');

            if (iframe) {
                iframe.tabIndex = -1;
            }
        }
    }
}
