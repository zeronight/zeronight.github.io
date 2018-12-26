declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
  }
}

declare module 'gitalk';
declare module 'gitalk/dist/gitalk.css';