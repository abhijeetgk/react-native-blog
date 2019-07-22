import { createStackNavigator,createAppContainer } from 'react-navigation';
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import CategoryListingScreen from './screens/CategoryList';
import PostScreen from './screens/Post';

const AppNavigator = createStackNavigator({
    
        Home:HomeScreen,
        Details:DetailsScreen,
        CategoryList:CategoryListingScreen,
        Post:PostScreen        
    },{
        initialRouteName:"Home"
    }
    
)

export default createAppContainer(AppNavigator);