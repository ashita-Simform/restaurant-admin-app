import * as React from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ButtonAtom from '../../Button/button';
import ModalAtom from '../../Modal/modal';
import { LoadingFallback } from '../../../shared/Loading Feedback/LoadingFallback';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

interface ImageUploadAtomProps {
  onUpload: (base64: string) => void;
}

/**
 * ImageUploadAtom Component
 *
 * This component provides an image upload functionality with validation for file type and size.
 * It allows users to upload a single image and displays a modal for any validation errors or processing issues.
 *
 * @param {ImageUploadAtomProps} props - The props for the ImageUploadAtom component.
 * @param {(base64: string) => void} props.onUpload - Callback function triggered after a successful image upload.
 *                                                    It receives the uploaded image as a base64 string.
 *
 * @returns {JSX.Element} The rendered ImageUploadAtom component.
 *
 * @remarks
 * - Supported image types: JPEG, PNG, GIF, WEBP.
 * - Maximum file size: 5 MB.
 * - Displays a loading indicator while processing the image.
 * - Shows a modal for validation errors or processing failures.
 */
const ImageUploadAtom: React.FC<ImageUploadAtomProps> = ({
  onUpload,
}: ImageUploadAtomProps): React.JSX.Element => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const validImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  const maxFileSize = 5 * 1024 * 1024;

  const handleChange = (info: { fileList: UploadFile[] }) => {
    const newFile = info?.fileList[0]?.originFileObj as File | undefined;

    if (!newFile) {
      setFileList([]);
      return;
    }

    if (info.fileList.length > 1) {
      setModalContent('Only one image can be uploaded at a time.');
      setIsModalVisible(true);
      setFileList([info.fileList[info.fileList.length - 1]]);
      return;
    }

    if (!validImageTypes.includes(newFile.type)) {
      setModalContent(
        'Invalid file type. Only JPEG, PNG, GIF, WEBP are allowed.'
      );
      setIsModalVisible(true);
      setFileList([]);
      return;
    }

    if (newFile.size > maxFileSize) {
      setModalContent('File size exceeds the 5 MB limit.');
      setIsModalVisible(true);
      setFileList([]);
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      onUpload(base64);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setModalContent('Failed to process the image.');
      setIsModalVisible(true);
      setIsLoading(false);
    };
    reader.readAsDataURL(newFile);

    setFileList(info.fileList ?? []);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalContent('');
  };

  return (
    <div className="image-upload-atom">
      {isLoading ? (
        <LoadingFallback message="Processing your image..." />
      ) : (
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleChange}
          onRemove={(file) => {
            setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
          }}
          className="upload-dark-theme"
        >
          {fileList.length >= 1 ? null : (
            <ButtonAtom
              type="primary"
              icon={<UploadOutlined />}
              className="upload-button"
            >
              Upload
            </ButtonAtom>
          )}
        </Upload>
      )}

      <ModalAtom
        title="Notice"
        content={<>{modalContent}</>}
        isVisible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ImageUploadAtom;
