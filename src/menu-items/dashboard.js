// assets
import { IconDashboard, IconDeviceAnalytics ,IconSearch} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconSearch
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
