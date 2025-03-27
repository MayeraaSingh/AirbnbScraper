import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

declare module 'next/image' {
  interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    style?: React.CSSProperties;
    blurDataURL?: string;
    unoptimized?: boolean;
  }
  
  export default function Image(props: ImageProps): JSX.Element;
} 