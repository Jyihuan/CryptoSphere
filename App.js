import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// redux
import store from "./store/index";
import { Provider } from "react-redux";

import LoginPage from "./pages/Login";
// 导入页面组件
import HomePage from "./pages/Home";
import MinePage from "./pages/Mine";
import History from "./pages/History";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 定义每个Tab的子堆栈
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} />
      {/* 在PageA的子页面之间添加更多的屏幕 */}
      <Stack.Screen name="Detail" component={History} />
    </Stack.Navigator>
  );
}

function MineStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MinePage" component={MinePage} />
      {/* 在PageB的子页面之间添加更多的屏幕 */}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Mine" component={MineStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
