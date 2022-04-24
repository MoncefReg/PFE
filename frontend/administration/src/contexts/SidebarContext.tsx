import { createContext, useState } from 'react';

interface Props {
  isCollapsed: boolean;
  handleCollapse: () => void;
}

const initValue: Props = {
  isCollapsed: false,
  handleCollapse: () => {}
};

export const SidebarConetxt = createContext(initValue);

const SidebarProvider = ({ children }: { children: JSX.Element }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const handleCollapse = () => setIsCollapsed((prevState) => !prevState);

  return (
    <SidebarConetxt.Provider value={{ isCollapsed, handleCollapse }}>
      {children}
    </SidebarConetxt.Provider>
  );
};

export default SidebarProvider;
