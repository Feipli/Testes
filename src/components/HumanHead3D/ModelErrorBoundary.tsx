import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ModelErrorBoundaryProps {
  children: ReactNode
  onError: () => void
}

interface ModelErrorBoundaryState {
  hasError: boolean
}

export class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  state: ModelErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    this.props.onError()
  }

  render(): ReactNode {
    if (this.state.hasError) return null
    return this.props.children
  }
}
