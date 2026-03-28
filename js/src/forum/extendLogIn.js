import { extend, override } from 'flarum/common/extend';
import HCaptcha from './components/HCaptcha';
import HCaptchaState from './states/HCaptchaState';

export default function () {
  const isInvisible = app.data['ralkage-hcaptcha.type'] === 'invisible';
  const logInPath = 'flarum/forum/components/LogInModal';

  extend(logInPath, 'oninit', function () {
    if (!app.forum.attribute('hCaptchaEnableLogin')) return;

    this.hcaptcha = new HCaptchaState(
      () => {
        if (isInvisible) {
          const event = new Event('submit');
          event.isHcaptchaSecondStep = true;
          this.onsubmit(event);
        }
      },
      (alertAttrs) => {
        this.loaded();
        this.alertAttrs = alertAttrs;
      }
    );
  });

  extend(logInPath, 'loginParams', function (data) {
    if (!this.hcaptcha) return;

    data['h-captcha-response'] = this.hcaptcha.getResponse();
  });

  extend(logInPath, 'fields', function (fields) {
    if (!this.hcaptcha) return;

    fields.add(
      'hcaptcha',
      HCaptcha.component({
        state: this.hcaptcha,
      }),
      -5
    );
  });

  extend(logInPath, 'onerror', function () {
    if (!this.hcaptcha) return;

    this.hcaptcha.reset();
  });

  override(logInPath, 'onsubmit', function (original, e) {
    if (this.hcaptcha && isInvisible && !e.isHcaptchaSecondStep) {
      e.preventDefault();
      this.loading = true;
      this.hcaptcha.execute();
      return;
    }

    return original(e);
  });
}
