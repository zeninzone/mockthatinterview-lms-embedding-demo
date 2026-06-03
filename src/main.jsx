import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { getActiveClientConfig } from './clients';
import './styles.css';

const client = getActiveClientConfig();
document.title = `${client.displayName} · Learner portal · MTI embed demo`;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
