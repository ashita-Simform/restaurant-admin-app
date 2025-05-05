import { Form, Input, InputNumber, Select, Divider, Tooltip, Card } from 'antd';
import {
  InfoCircleOutlined,
  DollarOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../../store';
import { MutableMenuItem } from '@/interface';
import {
  InputAtom,
  ButtonAtom,
  ImageUploadAtom,
  SwitchAtom,
} from '../../atoms';
import { useSanitizedInput } from '../../../hooks/useSanitizedInput';
import ModalAtom from '../../atoms/Modal/modal';
import { useState } from 'react';
import styles from '../../../styles/MenuItemForm.module.css';

const { TextArea } = Input;

/**
 * Props for the MenuItemForm component.
 */
interface MenuItemFormProps {
  /**
   * Initial values for the form fields.
   */
  initialValues?: Partial<MutableMenuItem>;

  /**
   * Callback function triggered on form submission.
   * @param values - The form values excluding the `id` field.
   */
  onSubmit: (values: Omit<MutableMenuItem, 'id'>) => void;

  /**
   * Callback function triggered when the form is canceled.
   */
  onCancel: () => void;

  /**
   * Text for the submit button.
   */
  submitButtonText: string;
}

/**
 * MenuItemForm component for creating or editing a menu item.
 * @param props - The props for the component.
 */
export const MenuItemForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitButtonText,
}: MenuItemFormProps) => {
  const { categories } = useAppSelector((state) => state.menu);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState<string | File | undefined>(
    initialValues?.image ?? undefined
  );

  const {
    sanitizedValue: sanitizedName,
    handleChange: handleNameChange,
    isValid: isNameValid,
  } = useSanitizedInput(initialValues?.name || '');

  const isFormValid = isNameValid;

  /**
   * Handles the closing of the modal.
   */
  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  /**
   * Handles the image upload and sets the image file.
   * @param base64 - The base64 string of the uploaded image.
   */
  const handleImageUpload = (base64: string) => {
    setImageFile(base64);
  };

  return (
    <>
      <Card
        title="Menu Item Details"
        extra={
          <span className={styles.cardExtraText}>
            Please fill all required fields carefully
          </span>
        }
        className={styles.formCard}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) =>
            onSubmit({
              ...values,
              name: sanitizedName,
              image: imageFile,
            })
          }
          initialValues={{
            available: true,
            ...initialValues,
          }}
          className={styles.form}
        >
          <Divider orientation="left" className={styles.divider}>
            Basic Info
          </Divider>

          <Form.Item
            name="name"
            label={
              <span>
                Name&nbsp;
                <Tooltip title="Enter a unique, clean name. No special characters.">
                  <InfoCircleOutlined className={styles.icon} />
                </Tooltip>
              </span>
            }
            rules={[{ required: true, message: 'Please input the item name!' }]}
            className={styles.inputItem}
          >
            <InputAtom
              value={sanitizedName}
              onChange={(e) => handleNameChange(e)}
              onBlur={() => {
                if (!isNameValid) setIsModalVisible(true);
              }}
              prefix={<TagsOutlined />}
              placeholder="e.g., Chicken Alfredo Pasta"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className={styles.label}>Description</span>}
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
            className={styles.textAreaItem}
          >
            <TextArea rows={4} placeholder="Describe the dish..." />
          </Form.Item>

          <Divider orientation="left" className={styles.divider}>
            Pricing & Category
          </Divider>

          <Form.Item
            name="price"
            label={<span className={styles.label}>Price</span>}
            rules={[{ required: true, message: 'Please input the price!' }]}
            className={styles.numberItem}
          >
            <InputNumber
              min={0}
              precision={2}
              prefix={<DollarOutlined />}
              className={styles.fullWidth}
              placeholder="e.g., 12.99"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span className={styles.label}>Category</span>}
            rules={[{ required: true, message: 'Please select a category!' }]}
            className={styles.selectItem}
          >
            <Select placeholder="Select a category">
              {categories.map((category: string) => (
                <Select.Option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Divider orientation="left" className={styles.divider}>
            Ingredients & Image
          </Divider>

          <Form.Item
            name="ingredients"
            label={<span className={styles.label}>Ingredients</span>}
            rules={[
              { required: true, message: 'Please input the ingredients!' },
            ]}
            help="Enter ingredients separated by commas"
            className={styles.textAreaItem}
          >
            <TextArea
              rows={2}
              placeholder="e.g., chicken, pasta, cream sauce"
            />
          </Form.Item>

          <Form.Item
            name="image"
            label={<span className={styles.label}>Upload Dish Image</span>}
            className={styles.uploadArea}
          >
            <ImageUploadAtom onUpload={handleImageUpload} />
          </Form.Item>

          <Divider orientation="left" className={styles.divider}>
            Availability
          </Divider>

          <Form.Item
            name="available"
            label={<span className={styles.label}>Available</span>}
            valuePropName="checked"
            className={styles.switchItem}
          >
            <SwitchAtom />
          </Form.Item>

          <Form.Item className={styles.buttonGroup}>
            <ButtonAtom
              type="primary"
              htmlType="submit"
              disabled={!isFormValid}
            >
              {submitButtonText}
            </ButtonAtom>
            <ButtonAtom className="menu-item-form-button" onClick={onCancel}>
              Cancel
            </ButtonAtom>
          </Form.Item>
        </Form>
      </Card>

      <ModalAtom
        title="Invalid Input Detected"
        content={
          <>
            Your input contains potentially harmful characters that are not
            allowed.
            <br />
            <strong>Disallowed Characters:</strong> `{'<'}`, `{'>'}`, `&quot;`,
            `&apos;`, `&`, `;`, `{`, `}`, `(`, `)`, `\`
            <br />
            <strong>Disallowed Patterns:</strong> `SELECT *`, `UNION SELECT`,
            `WHERE 1=1`, `DROP TABLE`, `--`, `#`
          </>
        }
        isVisible={isModalVisible}
        onClose={handleModalClose}
      />
    </>
  );
};
