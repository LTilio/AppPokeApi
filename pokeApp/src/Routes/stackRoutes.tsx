import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../Pages/Login";
import { Home } from "../Pages/Home";

export type RootStackParamsList = {
  StackLogin: { name: string };
  StackHome: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StackLogin" component={Login} />
        <Stack.Screen name="StackHome" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
