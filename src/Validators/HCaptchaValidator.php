<?php

namespace Ralkage\HCaptcha\Validators;

use Flarum\Foundation\AbstractValidator;

class HCaptchaValidator extends AbstractValidator
{
    protected $rules = [
        'hcaptcha' => ['required', 'hcaptcha'],
    ];
}
