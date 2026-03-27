import { extend, override } from 'flarum/common/extend';
import HCaptcha from './components/HCaptcha';
import HCaptchaState from './states/HCaptchaState';

export default function () {
  const isInvisible = app.data['ralkage-hcaptcha.type'] === 'invisible';
  const signUpPath = 'flarum/forum/components/SignUpModal';

  extend(signUpPath, 'oninit', function () {
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

  extend(signUpPath, 'submitData', function (data) {
    data['h-captcha-response'] = this.hcaptcha.getResponse();
  });

  extend(signUpPath, 'fields', function (fields) {
    fields.add(
      'hcaptcha',
      HCaptcha.component({
        state: this.hcaptcha,
      }),
      -5
    );
  });

  extend(signUpPath, 'onerror', function () {
    this.hcaptcha.reset();
  });

  override(signUpPath, 'onsubmit', function (original, e) {
    if (isInvisible && !e.isHcaptchaSecondStep) {
      e.preventDefault();
      this.loading = true;
      this.hcaptcha.execute();
      return;
    }

    return original(e);
  });
}
