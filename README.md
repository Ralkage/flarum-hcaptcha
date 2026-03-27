# hCaptcha — Flarum Extension

Increase your [Flarum](https://flarum.org) forum's security with [hCaptcha](https://www.hcaptcha.com/). Protects registration, new discussions, and replies from spam and abuse.

## Features

- **Registration Protection** — Requires hCaptcha during user sign-up
- **Post Protection** — Requires hCaptcha when creating discussions and replies
- **Checkbox & Invisible Modes** — Standard visible checkbox or transparent invisible challenge
- **Permission Bypass** — Exempt specific user groups from captcha via admin permissions
- **Dark Mode Support** — Automatically matches your forum's theme

## Requirements

- Flarum `^1.8`
- PHP `^8.0`

## Links

- [Ralkage](https://ralkage.com)
- [Github](https://github.com/Ralkage/flarum-hcaptcha)
- [Packagist](https://packagist.org/packages/ralkage/flarum-hcaptcha)
- [Discuss](https://discuss.flarum.org/d/28257)

## Installation

```bash
composer require ralkage/flarum-hcaptcha
```

Then enable it in your Flarum admin panel under **Extensions**.

## Setup

1. Create an account at [hCaptcha](https://dashboard.hcaptcha.com/) and get your **Site Key** and **Secret Key**.
2. Go to **Admin → hCaptcha** and enter your credentials.
3. Choose between **Checkbox** (visible) or **Invisible** mode.
4. Optionally adjust which user groups can bypass the captcha under **Permissions**.

## License

MIT — see [LICENSE](LICENSE).
