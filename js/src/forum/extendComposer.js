import { extend, override } from 'flarum/common/extend';
import HCaptchaState from './states/HCaptchaState';
import HCaptcha from './components/HCaptcha';

export default function (composerPath) {
  const isInvisible = app.data['ralkage-hcaptcha.type'] === 'invisible';

  extend(composerPath, 'oninit', function () {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    this.hcaptcha = new HCaptchaState(() => {
      if (isInvisible) {
        this.onsubmit('hcaptchaSecondStep');
      }
    });
  });

  extend(composerPath, 'data', function (data) {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    data['h-captcha-response'] = this.hcaptcha.getResponse();
  });

  extend(composerPath, 'headerItems', function (fields) {
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

  extend(composerPath, 'loaded', function () {
    if (app.forum.attribute('postWithoutHCaptcha')) {
      return;
    }

    this.hcaptcha.reset();
  });

  override(composerPath, 'onsubmit', function (original, argument1) {
    if (!app.forum.attribute('postWithoutHCaptcha') && isInvisible && argument1 !== 'hcaptchaSecondStep') {
      this.loading = true;
      this.hcaptcha.execute();
      return;
    }

    return original();
  });
}
