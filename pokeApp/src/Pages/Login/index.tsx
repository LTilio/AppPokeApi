import {
  Image,
  ImageBackgroundBase,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInputComponent } from "../../Components/TextInput";
import { ButtonComponent } from "../../Components/ButtonComponent";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./style";
import banner from "../../Assets/banner.jpg";

export function Login() {
  const [trainerName, setTrainerName] = useState<string>();
  const navigator = useNavigation();

  const handleUser = (value: string) => {
    setTrainerName(value);
  };

  const handleLogin = () => {
    navigator.navigate("StackHome", { name: "Home" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={banner} alt="Pokebola" style={styles.logo} />
        <View style={styles.inputs}>
          <TextInputComponent
            placeholder="Trainer name"
            onChangeValue={handleUser}
          />
          <ButtonComponent title="Entrar" handleOnChange={handleLogin} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
