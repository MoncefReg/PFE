import { ElementType, LazyExoticComponent } from 'react';

export default interface Route {
  component: ElementType | LazyExoticComponent<any>;
  path: string;
  layout?: ElementType;
  layoutProps?: any;
  guard?: ElementType;
  guardProps?: any;
}
