import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from '../../../styles/GraphCard.module.css';
import { JSX } from 'react';

/**
 * Sample data for the graph.
 */
const data = [
  { name: 'Jan', visitors: 400 },
  { name: 'Feb', visitors: 300 },
  { name: 'Mar', visitors: 500 },
  { name: 'Apr', visitors: 700 },
];

/**
 * Props for the GraphCard component.
 */
interface GraphCardProps {
  /**
   * Title of the graph card.
   */
  title: string;
}

/**
 * GraphCard Component
 *
 * This component renders a line chart with a title, ideal for visualizing trends or metrics.
 * It uses Recharts for rendering the chart and includes sample data for demonstration purposes.
 *
 * @param {GraphCardProps} props - The props for the component.
 * @param {string} props.title - The title displayed above the graph.
 *
 * @returns {JSX.Element} A styled graph card component with a line chart.
 *
 * @remarks
 * - Styled using the `GraphCard.module.css` file.
 * - The chart is responsive and adjusts to the container's width.
 */
export const GraphCard = ({ title }: GraphCardProps): JSX.Element => {
  return (
    <div className={styles.graphCard}>
      <h3 className={styles.graphTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#ff7f50"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
