import { TextInput } from "react-native";
import { styles } from "./style";

interface PropsComponent {
  placeholder: string;
  onChangeValue?: (value: string) => void;
  value?: string;
}

export function TextInputComponent({
  placeholder,
  onChangeValue,
  value,
}: PropsComponent) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={"#ffff"}
      onChangeText={onChangeValue}
      value={value}
      style={styles.styleInput}
    />
  );
}
