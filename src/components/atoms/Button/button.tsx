import { forwardRef } from 'react';
import { ButtonProps, Button } from 'antd';
import classNames from 'classnames';
/**
 * A forward-ref functional component that renders a styled button element.
 * This component supports both `<button>` and `<a>` elements as its base,
 * depending on the `ButtonProps` provided.
 *
 * @param {ButtonProps} props - The properties passed to the button component.
 * @param {string} [props.className] - Additional custom class names to apply to the button.
 * @param {React.Ref<HTMLButtonElement | HTMLAnchorElement>} ref - A ref to the underlying button or anchor element.
 *
 * @returns {JSX.Element} A styled button or anchor element with applied classes and props.
 */
const ButtonAtom = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, ...props }, ref) => {
  const buttonClass = classNames(
    'rounded-md font-semibold transition-all px-4 py-2',
    'bg-blue-600 text-white hover:bg-blue-700',
    'dark:bg-blue-500 dark:hover:bg-blue-600',
    className
  );

  return <Button {...props} ref={ref} className={buttonClass} />;
});

ButtonAtom.displayName = 'ButtonAtom';

export default ButtonAtom;
