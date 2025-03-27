import { IconContext } from 'react-icons';

declare module 'react-icons/fa' {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
    className?: string;
  }

  export type IconType = (props: IconBaseProps) => JSX.Element;
  
  export const FaSearch: IconType;
  export const FaStar: IconType;
  export const FaUser: IconType;
  export const FaGlobe: IconType;
  export const FaUserCircle: IconType;
  export const FaCalendarAlt: IconType;
  export const FaDollarSign: IconType;
} 