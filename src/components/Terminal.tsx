import { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export const Terminal = () => {
    const terminalContainerReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalContainerReference.current) {
            const terminal = new XTerminal({});
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            terminal.open(terminalContainerReference.current);
            fitAddon.fit();
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
            };
        }
    }, []);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
            }}
            ref={terminalContainerReference}
        />
    );
};
