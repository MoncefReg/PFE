import React from 'react';

export interface SidebarItem {
  text: string;
  link: string;
  icon?: React.FC<any>;
}
