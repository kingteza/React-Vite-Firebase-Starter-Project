import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { SVGProps } from 'react';

function EosIconsAdminOutlined(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12M4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"
      ></path>
      <circle cx={12} cy={8.5} r={2.5} fill="currentColor"></circle>
      <path
        fill="currentColor"
        d="M7 15a5.78 5.78 0 0 0 5 3a5.78 5.78 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3"
      ></path>
    </svg>
  );
}

const Icon0 = EosIconsAdminOutlined;

export default (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Icon0} {...props} />
);
