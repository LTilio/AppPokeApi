import { RootStackParamsList } from "./stackRoutes";



declare global{
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamsList{}
    }
}