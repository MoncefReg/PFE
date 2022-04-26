import { useContext } from 'react';
import { SidebarConetxt } from 'src/contexts/SidebarContext';

const useSidebar = () => useContext(SidebarConetxt);

export default useSidebar;
