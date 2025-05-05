import { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Typography, Space, Divider } from 'antd';
import { ButtonAtom } from '../../atoms';
import { motion } from 'framer-motion';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../../../styles/ErrorBoundary.module.css';
/**
 * Props for the ErrorBoundary component.
 */
interface Props {
  children: ReactNode;
  name?: string;
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component.
 */
interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * A React component that acts as an error boundary to catch JavaScript errors
 * in its child component tree, log those errors, and display a fallback UI.
 *
 * @template Props - The props type for the ErrorBoundary component.
 * @template State - The state type for the ErrorBoundary component.
 *
 * @property {State} state - The current state of the error boundary, including whether an error has occurred.
 * @property {Props} props - The properties passed to the error boundary, including optional fallback UI and component name.
 *
 * method static getDerivedStateFromError - Updates the state when an error is caught.
 * method componentDidCatch - Logs error details when an error is caught.
 * method handleReset - Resets the error boundary state.
 * method render - Renders the fallback UI or child components.
 */
export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  /**
   * Updates the state when an error is caught.
   * @param error - The error that was thrown.
   * @returns Updated state.
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Logs error details when an error is caught.
   * @param error - The error that was thrown.
   * @param errorInfo - Additional information about the error.
   */
  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error caught by boundary ${this.props.name}:`, {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    });
  }

  /**
   * Resets the error boundary state.
   */
  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  /**
   * Renders the component.
   * @returns The rendered component.
   */
  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={styles.container}
        >
          <Result
            status="500"
            title={
              <Typography.Title level={2}>
                Oops! Something broke
              </Typography.Title>
            }
            subTitle={
              <Typography.Paragraph
                type="secondary"
                className="error-boundary-paragraph"
              >
                {this.state.error?.message ??
                  'An unexpected error has occurred.'}
              </Typography.Paragraph>
            }
            extra={
              <Space direction="vertical" size="large" align="center">
                <div className={styles.errorDetails}>
                  <Typography.Text strong type="danger">
                    Error caught inside{' '}
                    <i>{this.props.name ?? 'Unknown Component'}</i>
                  </Typography.Text>
                  <Divider />
                  <Typography.Paragraph code className={styles.errorMessage}>
                    {this.state.error?.toString()}
                  </Typography.Paragraph>
                </div>

                <Space size="middle">
                  <ButtonAtom
                    type="primary"
                    size="large"
                    icon={<ReloadOutlined size={18} />}
                    onClick={() => window.location.reload()}
                  >
                    Reload Page
                  </ButtonAtom>

                  <ButtonAtom
                    type="default"
                    size="large"
                    onClick={this.handleReset}
                  >
                    Try Again
                  </ButtonAtom>
                </Space>
              </Space>
            }
          />
        </motion.div>
      );
    }

    return this.props.children;
  }
}
