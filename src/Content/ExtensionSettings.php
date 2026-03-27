<?php

namespace Ralkage\HCaptcha\Content;

use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;

class ExtensionSettings
{
    protected string $prefix = 'ralkage-hcaptcha.';

    protected array $keys = ['credentials.site', 'type'];

    public function __construct(
        protected SettingsRepositoryInterface $settings
    ) {}

    public function __invoke(Document $document): void
    {
        foreach ($this->keys as $key) {
            $document->payload[$this->prefix.$key] = $this->settings->get($this->prefix.$key);
        }
    }
}
