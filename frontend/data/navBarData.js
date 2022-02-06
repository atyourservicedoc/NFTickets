import { FiGlobe, FiSearch, FiPlus, FiTrendingUp } from "react-icons/fi";
import MainContent from "../components/dashboardPages/MainContent";
import SearchContent from "../components/dashboardPages/SearchContent";
import CreateContent from "../components/dashboardPages/CreateContent";
import SalesContent from "../components/dashboardPages/SalesContent";
import MyTicketsContent from "../components/dashboardPages/MyTicketsContent";

// used for populating nav bar on dashboard

// export the data
module.exports = [
    {
        title: 'Explore',
        icon: <FiSearch size="20" />,
        content: <SearchContent />,
        id: 'explore',
        authRequired: true
    },
    {
        title: 'Create',
        icon: <FiPlus size="20" />,
        content: <CreateContent />,
        id: 'create',
        authRequired: true
    },
    {
        title: 'My Tickets',
        icon: <FiTrendingUp size="20" />,
        content: <MyTicketsContent />,
        id: 'mytickets',
        authRequired: true
    },
    {
        title: 'Sales',
        icon: <FiTrendingUp size="20" />,
        content: <SalesContent />,
        id: 'sales',
        authRequired: true
    }
]