<?php

namespace Ralkage\HCaptcha\Listeners;

use Flarum\Discussion\Event\Saving;
use Illuminate\Support\Arr;
use Ralkage\HCaptcha\Validators\HCaptchaValidator;

class StartDiscussionValidate
{
    public function __construct(
        protected HCaptchaValidator $validator
    ) {}

    public function handle(Saving $event): void
    {
        if (!$event->discussion->exists) {
            if ($event->actor->hasPermission('ralkage-hcaptcha.postWithoutHCaptcha')) {
                return;
            }

            $this->validator->assertValid([
                'hcaptcha' => Arr::get($event->data, 'attributes.h-captcha-response'),
            ]);
        }
    }
}
