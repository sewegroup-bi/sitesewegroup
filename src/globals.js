// Expõe React/ReactDOM como globais — os componentes em components/*.jsx
// usam o padrão de globais de janela (window.X) em vez de import/export.
import React from 'react';
import * as ReactDOM from 'react-dom/client';

window.React = React;
window.ReactDOM = ReactDOM;
