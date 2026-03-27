<?php

namespace Ralkage\HCaptcha\Listeners;

use Flarum\Foundation\AbstractValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Validator;

class ConfigureLoginValidator
{
    public function __construct(
        protected SettingsRepositoryInterface $settings
    ) {}

    public function __invoke(AbstractValidator $flarumValidator, Validator $validator)
    {
        if (!$this->settings->get('ralkage-hcaptcha.enable_login')) {
            return;
        }

        $secret = $this->settings->get('ralkage-hcaptcha.credentials.secret');

        $validator->addExtension(
            'hcaptcha',
            function ($attribute, $value, $parameters) use ($secret) {
                if (empty($value)) {
                    return false;
                }

                $response = file_get_contents('https://api.hcaptcha.com/siteverify', false, stream_context_create([
                    'http' => [
                        'method' => 'POST',
                        'header' => 'Content-Type: application/x-www-form-urlencoded',
                        'content' => http_build_query([
                            'secret' => $secret,
                            'response' => $value,
                        ]),
                    ],
                ]));

                if ($response === false) {
                    return false;
                }

                $result = json_decode($response, true);

                return $result['success'] ?? false;
            }
        );

        $validator->addRules([
            'h-captcha-response' => ['required', 'hcaptcha'],
        ]);
    }
}
