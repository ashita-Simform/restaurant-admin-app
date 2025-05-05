import {
  Input,
  Select,
  Space,
  Popconfirm,
  Tag,
  Row,
  Col,
  Card,
  Pagination,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../store';
import { useNavigation } from '../hooks/useNavigation';
import { useMenuFilters } from '../hooks/useMenuFilters';
import { deleteMenuItem } from '@/store/features';
import { Category } from '@/interface';
import styles from '../styles/MenuItems.module.css';
import { ButtonAtom, ImageAtom } from '@/components/atoms';
import logo from '../assets/images/shared image.png';
import { usePagination } from '@/hooks/usePagination';
const { Search } = Input;

/**
 * Props for the MenuItemPage component.
 */
type MenuItemsPageProps = {
  className?: string;
};

/**
 * Component representing the Menu Items Page.
 *
 * This page displays a table of menu items with options to filter, search, edit, and delete items.
 * It also provides a ButtonAtom to add new menu items.
 *
 * @param {MenuItemsPageProps} props - The props for the MenuItemsPage component.
 * @param {string} [props.className] - Optional additional class name for styling the component.
 *
 * @returns {JSX.Element} The rendered Menu Items Page component.
 *
 * @remarks
 * - The table includes columns for item name, category, price, availability, and actions.
 * - Actions include editing and deleting menu items.
 * - Filters include a search bar and a category dropdown.
 * - The `useMenuFilters` hook is used to manage filtering logic.
 * - The `useAppDispatch` and `useAppSelector` hooks are used to interact with the Redux store.
 *
 */
export const MenuItemsPage = ({ className }: MenuItemsPageProps) => {
  const dispatch = useAppDispatch();
  const { navigateToPath } = useNavigation();

  const { items, categories } = useAppSelector((state) => state.menu);
  const { setSearchText, setCategoryFilter, filteredItems } =
    useMenuFilters(items);

  const { currentPage, setCurrentPage, pageSize, paginatedItems, totalItems } =
    usePagination(filteredItems, 8);

  return (
    <>
      <div className={`${styles['controls']} ${className ?? ''}`}>
        <Space className={styles['filters']}>
          <Search
            placeholder="Search menu items..."
            onChange={(e) => setSearchText(e.target.value)}
            className={styles['searchInput']}
          />
          <Select
            placeholder="Filter by category"
            allowClear
            className={styles['categorySelect']}
            onChange={(value) => setCategoryFilter(value)}
          >
            {categories.map((category: Category) => (
              <Select.Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </Space>
        <ButtonAtom
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigateToPath('/menu/add')}
        >
          Add Menu Item
        </ButtonAtom>
      </div>
      <div className={styles.pageWrapper}>
        <Row gutter={[16, 16]}>
          {paginatedItems.map(
            (item: {
              id: string;
              name?: string;
              image?: string;
              category?: string;
              available?: boolean;
              price?: number;
            }) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  className={styles.card}
                  cover={
                    <ImageAtom
                      alt={item.name ?? 'Menu Item'}
                      src={item.image ?? logo}
                      style={{
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  }
                  actions={[
                    <ButtonAtom
                      icon={<EditOutlined />}
                      onClick={() => navigateToPath(`/menu/edit/${item.id}`)}
                    >
                      Edit
                    </ButtonAtom>,
                    <Popconfirm
                      title="Delete this item?"
                      onConfirm={() => dispatch(deleteMenuItem(item.id))}
                      okText="Yes"
                      cancelText="No"
                    >
                      <ButtonAtom icon={<DeleteOutlined />} danger>
                        Delete
                      </ButtonAtom>
                    </Popconfirm>,
                  ]}
                >
                  <Card.Meta
                    title={item.name ?? 'Unnamed Item'}
                    description={
                      <>
                        <Tag color="blue">
                          {item.category ?? 'Uncategorized'}
                        </Tag>
                        <Tag color={item.available ? 'green' : 'red'}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </Tag>
                        <div className="menu-item-price">
                          $ {item.price?.toFixed(2) ?? 'N/A'}
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            )
          )}
        </Row>
        {totalItems > pageSize && (
          <div className={styles.paginationWrapper}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default MenuItemsPage;
