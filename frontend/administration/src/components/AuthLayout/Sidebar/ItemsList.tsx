// UI
import { List } from '@mui/material';

// Components
import Item from './Item';

// Others
import { SidebarItem } from 'src/models/Sidebar';

interface RenderItemsProps {
  items: SidebarItem[];
}
const RenderItems = ({ items }: RenderItemsProps) => (
  <List
    sx={{
      px: 0,
      mt: { md: 10, xs: 5 }
    }}
  >
    {items.map((item) => (
      <Item
        link={item.link}
        icon={item.icon}
        key={item.link}
        text={item.text}
      />
    ))}
  </List>
);

export default RenderItems;
