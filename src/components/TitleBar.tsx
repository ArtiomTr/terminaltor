import classes from './TitleBar.module.scss';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { appWindow } from '@tauri-apps/api/window';

export type TitleBarProps = PropsWithChildren<{
    className?: string;
}>;

export const TitleBar = ({ children, className }: TitleBarProps) => (
    <div data-tauri-drag-region className={clsx(classes['title-bar'], className)}>
        {children}
    </div>
);
