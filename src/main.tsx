import './index.css';
import './config/localization/i18n';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from 'Root';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
