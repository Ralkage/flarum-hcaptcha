import extendSignUp from './extendSignUp';
import extendComposer from './extendComposer';
import extendLogIn from './extendLogIn';

app.initializers.add('ralkage/flarum-ext-hcaptcha', () => {
    app.hcaptchaLoaded = false;

    extendSignUp();
    extendLogIn();
    extendComposer('flarum/forum/components/DiscussionComposer');
    extendComposer('flarum/forum/components/ReplyComposer');
});
