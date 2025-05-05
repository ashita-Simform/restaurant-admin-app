import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAppDispatch } from '../store';
import { addMenuItem } from '../store/features';
import { MenuItem } from '@/interface';
import { MenuItemForm } from '../components/molecules/Menu Item Form/MenuItemForm';
import styles from '../styles/AddMenuItemPage.module.css';
import { JSX } from 'react';

/**
 * AddMenuItemPage component allows users to add a new menu item.
 *
 * This page provides a form for inputting menu item details, such as name, ingredients, and price.
 * Upon submission, the new menu item is added to the Redux store, and the user is redirected to the menu page.
 *
 * @returns {JSX.Element} A JSX element containing the add menu item form.
 *
 * @remarks
 * - Utilizes React Router for navigation.
 * - Uses Redux for state management to add new menu items.
 * - Displays success messages using Ant Design's `message` component.
 */
const AddMenuItemPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Handles the form submission to add a new menu item.
   * @function
   * @param {Omit<MenuItem, "id">} values - The form values excluding the ID.
   * @returns {void}
   */
  const handleSubmit = (values: Omit<MenuItem, 'id'>): void => {
    const newItem: MenuItem = {
      ...values,
      id: Date.now().toString(),
      ingredients:
        typeof values.ingredients === 'string'
          ? values.ingredients.split(',').map((i) => i.trim())
          : values.ingredients,
      allergens: [],
      image: values.image ?? '',
    };

    dispatch(addMenuItem(newItem));
    message.success('Menu item added successfully!');
    navigate('/menu');
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.heading}>Add Menu Item</h2>
      <div className={styles.formContainer}>
        <MenuItemForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/menu')}
          submitButtonText="Add Menu Item"
        />
      </div>
    </div>
  );
};

export default AddMenuItemPage;
