import { Component, type ReactNode } from 'react';
import { Button } from '@/shared/components/ui';
import i18n from '@/shared/lib/i18n';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
          <h1 className="font-display text-xl font-bold text-red-600">{i18n.t('erreur_application')}</h1>
          <pre className="max-w-lg overflow-auto rounded-lg bg-slate-100 p-4 text-xs text-slate-700">
            {this.state.error.message}
          </pre>
          <Button onClick={() => window.location.reload()}>{i18n.t('recharger')}</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
