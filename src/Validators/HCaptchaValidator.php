<?php

namespace Ralkage\HCaptcha\Validators;

use Flarum\Foundation\AbstractValidator;

class HCaptchaValidator extends AbstractValidator
{
    protected array $rules = [
        'hcaptcha' => ['required', 'hcaptcha'],
    ];
}
