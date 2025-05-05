import { Image, ImageProps } from 'antd';
import * as React from 'react';
import classNames from 'classnames';
import { JSX } from 'react';

/**
 * A reusable image component that wraps Ant Design's Image with additional styling and animations.
 *
 * This component supports all properties defined in Ant Design's `ImageProps`.
 * It applies custom styles such as rounded corners, shadow effects, and a hover animation.
 *
 * @param {ImageProps} props - The properties passed to the image component.
 * @param {string} [props.className] - Additional custom class names to apply to the image.
 *
 * @returns {JSX.Element} A styled image element with hover effects.
 */
const ImageAtom: React.FC<ImageProps> = ({
  className,
  style,
  preview = false,
  ...props
}: ImageProps): JSX.Element => {
  return (
    <Image
      {...props}
      preview={preview}
      className={classNames(
        'rounded-lg shadow-md object-cover hover:scale-105 transition-transform duration-300',
        className
      )}
      style={{ ...style }}
    />
  );
};

export default ImageAtom;
