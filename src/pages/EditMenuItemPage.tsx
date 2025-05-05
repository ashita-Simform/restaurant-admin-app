import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../store';
import { updateMenuItem } from '../store/features';
import { MenuItem, MutableMenuItem } from '@/interface';
import { MenuItemForm } from '../components/molecules/Menu Item Form/MenuItemForm';
import styles from '../styles/AddMenuItemPage.module.css';

/**
 * EditMenuItemPage component allows users to edit an existing menu item.
 *
 * This page fetches the menu item based on the ID from the URL parameters.
 * If the menu item is not found, it redirects the user back to the menu page with an error message.
 *
 * @returns {JSX.Element | null} A JSX element containing the edit form, or null if the menu item is not found.
 *
 * @remarks
 * - Utilizes React Router for navigation and URL parameter handling.
 * - Uses Redux for state management to fetch and update menu items.
 * - Displays notifications using Ant Design's `message` component.
 */
const EditMenuItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.menu);

  const menuItem =
    items?.find((item: MutableMenuItem) => item.id === id);

  useEffect(() => {
    if (!menuItem) {
      message.error('Menu item not found!');
      navigate('/menu');
    }
  }, [menuItem, navigate]);

  const handleSubmit = (values: Omit<MenuItem, 'id'>) => {
    if (!menuItem) return;

    const updatedItem: MenuItem = {
      ...values,
      id: menuItem.id,
      ingredients:
        typeof values.ingredients === 'string'
          ? values.ingredients.split(',').map((i) => i.trim())
          : values.ingredients,
      allergens: [],
      image: values.image,
    };

    dispatch(updateMenuItem(updatedItem));
    message.success('Menu item updated successfully!');
    navigate('/menu');
  };

  if (!menuItem) return null;

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.heading}>Edit Menu Item</h2>
      <div className={styles.formContainer}>
        <MenuItemForm
          initialValues={{
            ...menuItem,
            ingredients: Array.isArray(menuItem.ingredients)
              ? menuItem.ingredients.join(', ')
              : menuItem.ingredients,
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/menu')}
          submitButtonText="Update Menu Item"
        />
      </div>
    </div>
  );
};

export default EditMenuItemPage;
