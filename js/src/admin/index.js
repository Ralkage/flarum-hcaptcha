import app from 'flarum/admin/app';

app.initializers.add('ralkage/flarum-ext-hcaptcha', () => {
  app.registry
    .for('ralkage-hcaptcha')
    .registerSetting({
      label: app.translator.trans('ralkage-hcaptcha.admin.settings.help_text', {
        a: <a href="https://dashboard.hcaptcha.com/settings" target="_blank" rel="noopener" />,
      }),
      type: 'hidden',
    })
    .registerSetting({
      setting: 'ralkage-hcaptcha.type',
      label: app.translator.trans('ralkage-hcaptcha.admin.settings.type_label'),
      options: {
        checkbox: 'Checkbox',
        invisible: 'Invisible',
      },
      required: true,
      default: 'checkbox',
      type: 'select',
    })
    .registerSetting({
      setting: 'ralkage-hcaptcha.credentials.site',
      label: app.translator.trans('ralkage-hcaptcha.admin.settings.site_key_label'),
      type: 'text',
      required: true,
    })
    .registerSetting({
      setting: 'ralkage-hcaptcha.credentials.secret',
      label: app.translator.trans('ralkage-hcaptcha.admin.settings.secret_key_label'),
      type: 'password',
      required: true,
    })
    .registerSetting({
      setting: 'hcaptcha-theme_dark_mode',
      label: app.translator.trans('ralkage-hcaptcha.admin.settings.dark_mode_label'),
      help: app.translator.trans('ralkage-hcaptcha.admin.settings.dark_mode_help'),
      type: 'switch',
    })
    .registerSetting({
      setting: 'ralkage-hcaptcha.enable_login',
      label: app.translator.trans('ralkage-hcaptcha.admin.settings.enable_login_label'),
      help: app.translator.trans('ralkage-hcaptcha.admin.settings.enable_login_help'),
      type: 'switch',
    })
    .registerPermission(
      {
        permission: 'ralkage-hcaptcha.postWithoutHCaptcha',
        label: app.translator.trans('ralkage-hcaptcha.admin.permissions.post_without_hcaptcha'),
        icon: 'fas fa-robot',
      },
      'reply'
    );
});
