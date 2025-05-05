import { JSX } from 'react';
import styles from '../../../styles/SummaryCard.module.css';

/**
 * SummaryCard Component
 *
 * This component renders a summary card with a title, amount, and timeframe.
 * It is designed to display key metrics or statistics in a visually appealing format.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the summary card.
 * @param {string} props.amount - The amount displayed in the summary card.
 * @param {string} props.timeframe - The timeframe displayed in the summary card.
 *
 * @returns {JSX.Element} A styled summary card component.
 *
 * @remarks
 * - Styled using the `SummaryCard.module.css` file.
 * - Ideal for dashboards or reports to highlight important data points.
 */
export const SummaryCard = ({
  title,
  amount,
  timeframe,
}: {
  title: string;
  amount: string;
  timeframe: string;
}): JSX.Element => {
  return (
    <div className={styles.summaryCard}>
      <h4 className={styles.title}>{title}</h4>
      <h2 className={styles.amount}>{amount}</h2>
      <p className={styles.timeframe}>{timeframe}</p>
    </div>
  );
};
