import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ContainerHOC } from './components/Container/hocs/ContainerHOC';
import { createApplicationStore } from './types';

const BUTTON_ELEMENT_ID = 'lang-ext-inject-button';

const isInjected = () => {
  return !!document.getElementById(BUTTON_ELEMENT_ID);
}

const getElementByClassName = (className: string): Element | null  => {
  const list = document.getElementsByClassName(className);
  return list && list.length ? list.item(0) : null;
}

const createRootElement = () => {
  const links = [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: 'use-credentials'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'
    }
  ];

  links.forEach(item => {
    const link = document.createElement('link');
    link.rel = item.rel;
    link.href = item.href;
    if (item.crossorigin) link.crossOrigin = item.crossorigin;
    document.head.append(link);
  });
  const subtitleBtnElem = getElementByClassName('ytp-subtitles-button');
  const parentElem = subtitleBtnElem ? subtitleBtnElem.parentElement : null;

  if (subtitleBtnElem && parentElem) {
    const rootElem = document.createElement("div");
    rootElem.id = BUTTON_ELEMENT_ID;
    rootElem.style.display = 'inline-block';
    rootElem.style.height = '40px';
    rootElem.style.lineHeight = '38px';
    parentElem.insertBefore(rootElem, subtitleBtnElem);
    return rootElem;
  }
  return null;
}

const waitForReady = (): Promise<Element> => {
  const getRootElement = () => {
    const list = document.getElementsByClassName('ytp-right-controls');
    return list && list.length ? list.item(0) : null;
  }

  const root = getRootElement();
  if (root) {
    return Promise.resolve(root)
  }

  return new Promise((resolve, reject) => {
    let counter = 0;
    const timer = setInterval(() => {
      const root = getRootElement();
      if (root) {
        clearInterval(timer);
        resolve(root);
      }
      counter++;
      if (counter > 20) {
        clearInterval(timer);
        reject();
      }
    }, 500);
  })
}

waitForReady().then(root => {
  if (!isInjected()) {
    const el = createRootElement();
    const store = createApplicationStore({});
    const appElement = React.createElement(ContainerHOC);
    const providerElement = React.createElement(Provider as any, { store }, appElement);
    const root = createRoot(el!);
    root.render(providerElement);
  }
})
