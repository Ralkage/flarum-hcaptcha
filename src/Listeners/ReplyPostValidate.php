<?php

namespace Ralkage\HCaptcha\Listeners;

use Flarum\Post\Event\Saving;
use Illuminate\Support\Arr;
use Ralkage\HCaptcha\Validators\HCaptchaValidator;

class ReplyPostValidate
{
    public function __construct(
        protected HCaptchaValidator $validator
    ) {}

    public function handle(Saving $event): void
    {
        if (!$event->post->exists) {
            // First post in a discussion is already validated by StartDiscussionValidate
            if ($event->post->discussion->post_number_index === 0) {
                return;
            }

            if ($event->actor->hasPermission('ralkage-hcaptcha.postWithoutHCaptcha')) {
                return;
            }

            $this->validator->assertValid([
                'hcaptcha' => Arr::get($event->data, 'attributes.h-captcha-response'),
            ]);
        }
    }
}
