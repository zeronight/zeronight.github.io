declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
  };
};

declare module 'gitalk/dist/gitalk-component';
declare module 'gitalk/dist/gitalk.css';
