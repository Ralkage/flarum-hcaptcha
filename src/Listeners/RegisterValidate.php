<?php

namespace Ralkage\HCaptcha\Listeners;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;
use Ralkage\HCaptcha\Validators\HCaptchaValidator;

class RegisterValidate
{
    public function __construct(
        protected HCaptchaValidator $validator
    ) {}

    public function handle(Saving $event): void
    {
        if (!$event->user->exists) {
            $this->validator->assertValid([
                'hcaptcha' => Arr::get($event->data, 'attributes.h-captcha-response'),
            ]);
        }
    }
}
