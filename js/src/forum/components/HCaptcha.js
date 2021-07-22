import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import load from 'external-load';

const addResources = async () => {
  if (app.hcaptchaLoaded) return;

  await load.js(`https://hcaptcha.com/1/api.js?render=explicit`);

  app.hcaptchaLoaded = true;
};

export default class HCaptcha extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    return (
      <div className="Form-group">
        <div className="h-captcha" />
      </div>
    );
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    addResources().then(() => {
      const interval = setInterval(() => {
        if (window.hcaptcha) {
          clearInterval(interval);
          this.attrs.state.render(vnode.dom.querySelector('.h-captcha'));
        }
      }, 250);
    });

    // It's possible to TAB into the hCaptcha iframe, and it's very confusing when using the invisible mode
    if (app.data['ralkage-hcaptcha.type'] === 'invisible') {
      const iframe = vnode.dom.querySelector('iframe');

      if (iframe) {
        iframe.tabIndex = -1;
      }
    }
  }
}
