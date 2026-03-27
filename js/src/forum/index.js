import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import extendSignUp from './extendSignUp';
import extendComposer from './extendComposer';
import extendLogIn from './extendLogIn';

app.initializers.add('ralkage/flarum-ext-hcaptcha', () => {
    app.hcaptchaLoaded = false;

    extendSignUp();
    extendLogIn();
    extendComposer(DiscussionComposer);
    extendComposer(ReplyComposer);
});
