import * as React from 'react';
import { SummaryCard } from '../../molecules/Summary Card/SummaryCard';
import { GraphCard } from '../../molecules/Graph Card/GraphCard';
import { ActivityTimeline } from '../../molecules/Activity Timeline/ActivityTimeline';
import styles from '../../../styles/RightSidebar.module.css';

/**
 * RightSidebar Component
 *
 * This component serves as a sidebar for displaying key metrics, graphs, and recent activities.
 * It includes the following sections:
 * - A `SummaryCard` for displaying total sales.
 * - Multiple `GraphCard` components for visualizing customer data.
 * - An `ActivityTimeline` for showing recent activities.
 *
 * @returns {JSX.Element} A styled sidebar component with summary, graphs, and activity timeline.
 *
 * @remarks
 * - Styled using the `RightSidebar.module.css` file.
 * - Designed to be used as a part of a dashboard layout.
 */
export const RightSidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.summaryCard}>
        <SummaryCard title="Total Sales" amount="$12,345" timeframe="30 days" />
      </div>
      <div className={styles.graphCard}>
        <GraphCard title="Customer Retention" />
      </div>
      <div className={styles.graphCard}>
        <GraphCard title="Offline Customers" />
      </div>
      <div className={styles.graphCard}>
        <GraphCard title="Online Customers" />
      </div>
      <div className={styles.timelineContainer}>
        <ActivityTimeline />
      </div>
    </aside>
  );
};
