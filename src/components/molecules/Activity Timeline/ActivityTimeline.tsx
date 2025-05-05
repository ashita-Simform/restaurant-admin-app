import { Timeline } from 'antd';
import styles from '../../../styles/ActivityTimeline.module.css';
import { JSX } from 'react';

/**
 * ActivityTimeline Component
 *
 * This component displays a timeline of recent activities in the application.
 * It uses Ant Design's `Timeline` component for a visually appealing representation.
 *
 * @returns {JSX.Element} A styled timeline component showcasing recent activities.
 *
 * @remarks
 * - Includes predefined activities such as order placements, cancellations, and promotions.
 * - Styled using the `ActivityTimeline.module.css` file.
 */
export const ActivityTimeline = (): JSX.Element => {
  return (
    <div className={styles.timelineContainer}>
      <h3 className={styles.timelineHeader}>Recent Activity</h3>
      <Timeline
        items={[
          { color: 'green', children: 'Order #1024 placed' },
          { color: 'blue', children: 'New customer signup' },
          { color: 'red', children: 'Order #1025 canceled' },
          { color: 'purple', children: 'Special discount launched' },
        ]}
      />
    </div>
  );
};
