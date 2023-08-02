import { createRoot } from 'react-dom/client';
import App from './App';

async function init() {
  const container = document.getElementById('root') as HTMLElement;

  const root = createRoot(container);
  root.render(<App />);

// calling IPC exposed from preload script
  window.electron.ipcRenderer.on('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    // console.log('hello')
    console.log(arg);
  });
  window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
}

init()

