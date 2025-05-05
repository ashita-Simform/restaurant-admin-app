import { Spin } from 'antd';
import styles from '../../../styles/LoadingFallback.module.css';
import { JSX } from 'react';

/**
 * Props for the LoadingFallback component.
 */
interface LoadingFallbackProps {
  /**
   * Optional loading message to display.
   * @default "Loading..."
   */
  message?: string;
}

/**
 * A fallback component to display a loading spinner with an optional message.
 *
 * @param {LoadingFallbackProps} props - The props for the component.
 * @returns {JSX.Element} The rendered LoadingFallback component.
 */
export const LoadingFallback = ({
  message = 'Loading...',
}: LoadingFallbackProps): JSX.Element => (
  <div className={styles.container} aria-label={message}>
    <Spin size="large" />
    <output className={styles.message}>{message}</output>
  </div>
);
