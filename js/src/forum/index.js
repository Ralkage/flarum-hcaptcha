import extendSignUp from './extendSignUp';
import extendComposer from './extendComposer';

app.initializers.add('ralkage/flarum-ext-hcaptcha', () => {
    app.hcaptchaLoaded = false;

    extendSignUp();
    extendComposer('flarum/forum/components/DiscussionComposer');
    extendComposer('flarum/forum/components/ReplyComposer');
});
