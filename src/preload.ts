// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

import { exposeModules } from './ipc';

void exposeModules(contextBridge, ipcRenderer, ['logReader']);
