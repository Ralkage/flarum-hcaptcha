import { extend, override } from 'flarum/common/extend';
import HCaptchaState from './states/HCaptchaState';
import HCaptcha from './components/HCaptcha';

export default function (Composer) {
  const isInvisible = app.data['ralkage-hcaptcha.type'] === 'invisible';

  extend(Composer.prototype, 'oninit', function () {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    this.hcaptcha = new HCaptchaState(() => {
      if (isInvisible) {
        // onsubmit is usually called without any argument.
        // We use the first argument to indicate the second call after invisible hCaptcha
        this.onsubmit('hcaptchaSecondStep');
      }
    });
  });

  extend(Composer.prototype, 'data', function (data) {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    data['h-captcha-response'] = this.hcaptcha.getResponse();
  });

  extend(Composer.prototype, 'headerItems', function (fields) {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    fields.add(
      'hcaptcha',
      HCaptcha.component({
        state: this.hcaptcha,
      }),
      -5
    );
  });

  // There's no onerror handler on composer classes, but we can react to loaded which is called after errors
  extend(Composer.prototype, 'loaded', function () {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    this.hcaptcha.reset();
  });

  override(Composer.prototype, 'onsubmit', function (original, argument1) {
    if (!app.forum.attribute('postWithoutHCaptcha') && isInvisible && argument1 !== 'hcaptchaSecondStep') {
      this.loading = true;
      this.hcaptcha.execute();
      return;
    }

    return original();
  });
}
