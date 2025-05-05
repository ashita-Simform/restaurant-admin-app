import * as React from 'react';
import { Modal } from 'antd';

interface ModalAtomProps {
  title: string;
  content: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

/**
 * A reusable modal component built with the Ant Design library.
 *
 * @param {ModalAtomProps} props - The properties for the modal component.
 * @param {string} props.title - The title displayed at the top of the modal.
 * @param {React.ReactNode} props.content - The main content displayed inside the modal.
 * @param {boolean} props.isVisible - Controls the visibility of the modal.
 * @param {() => void} props.onClose - Callback function triggered when the modal is closed.
 * @param {React.ReactNode} [props.children] - Optional additional content rendered below the main content.
 *
 * @returns {JSX.Element} A styled modal component with customizable content and behavior.
 */
const ModalAtom: React.FC<ModalAtomProps> = ({
  title,
  content,
  isVisible,
  onClose,
  children,
}: ModalAtomProps) => {
  return (
    <Modal
      title={<span className="text-lg font-semibold">{title}</span>}
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
      centered
      styles={{ body: { padding: '1.5rem' } }}
    >
      <div className="text-gray-700">{content}</div>
      {children && <div className="modal-children">{children}</div>}
    </Modal>
  );
};

export default ModalAtom;
