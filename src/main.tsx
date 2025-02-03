import './index.css';
import './config/localization/i18n';

import { createRoot } from 'react-dom/client';
import Root from 'Root';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
