import { extend, override } from 'flarum/common/extend';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import HCaptcha from './components/HCaptcha';
import HCaptchaState from './states/HCaptchaState';

export default function () {
  const isInvisible = app.data['ralkage-hcaptcha.type'] === 'invisible';

  extend(SignUpModal.prototype, 'oninit', function () {
    this.hcaptcha = new HCaptchaState(
      () => {
        if (isInvisible) {
          // Create "fake" event so this works when other extensions extend onsubmit as well
          const event = new Event('submit');
          event.isHcaptchaSecondStep = true;
          this.onsubmit(event);
        }
      },
      (alertAttrs) => {
        // Removes the spinner on the submit button so we can try again
        this.loaded();
        this.alertAttrs = alertAttrs;
      }
    );
  });

  extend(SignUpModal.prototype, 'submitData', function (data) {
    data['h-captcha-response'] = this.hcaptcha.getResponse();
  });

  extend(SignUpModal.prototype, 'fields', function (fields) {
    fields.add(
      'hcaptcha',
      HCaptcha.component({
        state: this.hcaptcha,
      }),
      -5
    );
  });

  extend(SignUpModal.prototype, 'onerror', function () {
    this.hcaptcha.reset();
  });

  override(SignUpModal.prototype, 'onsubmit', function (original, e) {
    if (isInvisible && !e.isHcaptchaSecondStep) {
      // When hcaptcha is invisible, onsubmit will be called two times
      // First time with normal event, we will call hCaptcha.execute
      // Second time is called from hcaptcha callback with a special isHcaptcha attribute
      e.preventDefault();
      this.loading = true;
      this.hcaptcha.execute();
      return;
    }

    return original(e);
  });
}
