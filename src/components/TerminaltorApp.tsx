import { Terminal } from './Terminal';
import classes from './TerminaltorApp.module.scss';
import { TitleBar } from './TitleBar';

export const TerminaltorApp = () => {
    return (
        <div className={classes['app']}>
            <TitleBar className={classes['app__title-bar']} />
            <div className={classes['app__container']}>
                <Terminal />
            </div>
        </div>
    );
};
