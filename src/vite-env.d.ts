// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string
  readonly VITE_YOUR_DOMAIN: string
  readonly DEV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
