import { Card, Row, Col, Statistic, Tag, Tooltip, Carousel } from 'antd';
import { useAppSelector } from '../store';
import {
  Bar,
  BarChart,
  CartesianAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from '../styles/DashboardPage.module.css';
import { ImageAtom } from '@/components/atoms';
import pizza from '../assets/images/pizza.jpeg';
import pasta from '../assets/images/pasta.png';
import burger from '../assets/images/burger.webp';
import { JSX } from 'react';

/**
 * DashboardPage Component
 * Displays the dashboard with statistics, charts, and other information.
 * @returns {JSX.Element} The rendered DashboardPage component.
 */
/**
 * DashboardPage component renders the main dashboard for the restaurant admin app.
 * It displays various statistics, charts, and insights about the restaurant's performance.
 *
 * @returns {JSX.Element} A JSX element containing the dashboard layout.
 *
 * @remarks
 * The component uses the following libraries and components:
 * - `useAppSelector` to access Redux state for menu items and categories.
 * - Ant Design components like `Row`, `Col`, `Card`, `Statistic`, and `Tag` for layout and styling.
 * - Recharts components like `BarChart`, `PieChart`, and `LineChart` for visualizing data.
 * - Custom `ImageAtom` component for displaying images.
 *
 *
 * @category Pages
 * @module DashboardPage
 *
 * @property {Array} items - List of menu items fetched from Redux state.
 * @property {Array} categories - List of menu categories fetched from Redux state.
 * @property {Array} revenueData - Static dummy data for hourly revenue visualization.
 * @property {Array} reviews - Static dummy data for customer reviews.
 * @property {Array} trendingKeywords - Static list of trending keywords.
 * @property {Array} specials - Static list of today's special dishes.
 * @property {Array} peoplesLikings - Static list of dishes liked by customers.
 */

const DashboardPage = (): JSX.Element => {
  const { items, categories } = useAppSelector((state) => state.menu);

  const revenueData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 9}:00`,
    revenue: Math.floor(Math.random() * 3000) + 500,
  }));

  const reviews = [
    { user: 'John Doe', comment: 'Amazing Pizza!', foodImage: pizza },
    { user: 'Jane Smith', comment: 'Loved the Pasta!', foodImage: pasta },
    { user: 'Mike Johnson', comment: 'Great Burgers!', foodImage: burger },
  ];

  const trendingKeywords = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Steak'];
  const specials = ['Truffle Pasta', 'Loaded Nachos', 'Dragon Roll Sushi'];
  const peoplesLikings = [
    'Cheese Burst Pizza',
    'Classic Cheeseburger',
    'Chocolate Lava Cake',
  ];

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.heading}>Dashboard</h2>

      {/* Overview Section */}
      <div className={styles.section}>
        <h3 className={styles.subHeading}>Overview</h3>
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12}>
            <Card className={`${styles.cardWithBorder} ${styles.cardOrange}`}>
              <Statistic title="Total Menu Items" value={items?.length} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card className={`${styles.cardWithBorder} ${styles.cardTeal}`}>
              <Statistic title="Total Categories" value={categories?.length} />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={styles.rowWithMargin}>
          <Col xs={24} sm={12} md={6}>
            <Card className={`${styles.cardWithBorder} ${styles.cardBlue}`}>
              <Statistic title="Total Orders" value={1240} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={`${styles.cardWithBorder} ${styles.cardGreen}`}>
              <Statistic title="Delivered" value={1185} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={`${styles.cardWithBorder} ${styles.cardRed}`}>
              <Statistic title="Cancelled" value={55} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className={`${styles.cardWithBorder} ${styles.cardPurple}`}>
              <Statistic title="Revenue ($)" value={234500} />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Charts Section */}
      <div className={styles.section}>
        <h3 className={styles.subHeading}>Performance Insights</h3>
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.cardTransparent}>
              <h3 className={styles.chartTitle}>Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={Array.from({ length: 12 }, (_, i) => ({
                    month: `Month ${i + 1}`,
                    revenue: Math.floor(Math.random() * 50000) + 10000,
                  }))}
                >
                  <CartesianAxis stroke="#333" />
                  <XAxis dataKey="month" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.cardTransparent}>
              <h3 className={styles.chartTitle}>Order Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Dine-In', value: 400 },
                      { name: 'Takeaway', value: 300 },
                      { name: 'Delivery', value: 300 },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.cardTransparent}>
              <h3 className={styles.chartTitle}>Weekly Orders</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={Array.from({ length: 7 }, (_, i) => ({
                    day: `Day ${i + 1}`,
                    orders: Math.floor(Math.random() * 200) + 50,
                  }))}
                >
                  <CartesianAxis stroke="#333" />
                  <XAxis dataKey="day" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Revenue Section */}
      <div className={styles.section}>
        <h3 className={styles.subHeading}>Revenue Analysis</h3>
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card className={styles.cardTransparent}>
              <h3>Today&apos;s Revenue (Hourly)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianAxis stroke="#333" />
                  <XAxis dataKey="time" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className={styles.cardTransparent}>
              <h3>This Week&apos;s Revenue (Daily)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={Array.from({ length: 7 }, (_, i) => ({
                    day: `Day ${i + 1}`,
                    revenue: Math.floor(Math.random() * 20000) + 5000,
                  }))}
                >
                  <CartesianAxis stroke="#333" />
                  <XAxis dataKey="day" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Reviews Section */}
      <div className={styles.section}>
        <h3 className={styles.subHeading}>Customer Reviews</h3>
        <br />
        <Carousel autoplay className={styles.carousel}>
          {reviews.map((item) => (
            <div key={item.user} className={styles.carouselItem}>
              <Card className={styles.cardTransparent} bordered={false}>
                <Row gutter={[16, 16]} align="middle">
                  <Col span={6}>
                    <ImageAtom src={item.foodImage} />
                  </Col>
                  <Col span={18}>
                    <h4>{item.user}</h4>
                    <p>{item.comment}</p>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Miscellaneous Section */}
      <div className={styles.section}>
        <h3 className={styles.subHeading}>Additional Insights</h3>
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card className={styles.cardTransparent}>
              <h3>Trending Keywords</h3>
              {trendingKeywords.map((keyword) => (
                <Tag color="cyan" key={keyword}>
                  #{keyword}
                </Tag>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className={styles.cardTransparent}>
              <h3>Today&apos;s Specials</h3>
              {specials.map((special) => (
                <Tag color="magenta" key={special}>
                  {special}
                </Tag>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className={styles.cardTransparent}>
              <h3>People&apos;s Liked Dishes</h3>
              {peoplesLikings.map((like) => (
                <Tag color="geekblue" key={like}>
                  {like}
                </Tag>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage;
