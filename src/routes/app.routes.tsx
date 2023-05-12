import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { Exercises } from "@screens/Exercises";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";

import HistorySVG from "@assets/history.svg";
import HomeSVG from "@assets/home.svg";
import ProfileSVG from "@assets/profile.svg";
import { Platform } from "react-native";

type AppRoutes = {
  Home: undefined;
  Profile: undefined;
  History: undefined;
  Exercises: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

  const { sizes, colors } = useTheme()
  const iconSize = sizes[7]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? "auto" : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6],
        paddingHorizontal: sizes[10]
      }
    }}>
      <Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color }) => (<HomeSVG fill={color} width={iconSize} height={iconSize} />)
      }}
      />
      <Screen name="History" component={History} options={{
        tabBarIcon: ({ color }) => (<HistorySVG fill={color} width={iconSize} height={iconSize} />)
      }}
      />
      <Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color }) => (<ProfileSVG fill={color} width={iconSize} height={iconSize} />)
      }}
      />
      <Screen name="Exercises" component={Exercises} options={{ tabBarButton: () => null }} />
    </Navigator>
  )
}