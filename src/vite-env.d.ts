// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_BASE_URL: string
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
