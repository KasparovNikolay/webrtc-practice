// eslint-disable @typescript-eslint/no-unused-vars
// eslint-disable no-unused-vars
import { ErrorInfo, ReactNode, Component } from 'react'

export class ErrorBoundary extends Component<
  { children: ReactNode | ReactNode[] },
  { hasError: boolean }
> {
  constructor(props: never) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <h1>Что-то пошло не так.</h1>
    }

    return this.props.children
  }
}
