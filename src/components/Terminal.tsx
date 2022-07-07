import { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const debounce = <T extends (...args: any[]) => any>(func: T, timeout = 300) => {
    let timer: number | undefined;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
};

export const Terminal = () => {
    const terminalContainerReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalContainerReference.current) {
            const terminal = new XTerminal({
                theme: {
                    background: '#222629',
                },
            });
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            terminal.open(terminalContainerReference.current);

            const resizeObserver = new ResizeObserver(debounce(fitAddon.fit.bind(fitAddon)));
            resizeObserver.observe(terminalContainerReference.current);

            terminal.write('hello');

            terminal.onKey((key) => {
                const char = key.domEvent.key;
                if (char === 'Enter') {
                    terminal.write('\r\n');
                } else if (char === 'Backspace') {
                    terminal.write('\b \b');
                } else {
                    terminal.write(char);
                }
            });

            return () => {
                terminal.dispose();
                resizeObserver.disconnect();
            };
        }
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
            ref={terminalContainerReference}
        />
    );
};
