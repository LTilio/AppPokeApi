import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface PropsComponent {
  title: string;
  handleOnChange: () => void;
}

export function ButtonComponent({ title, handleOnChange }: PropsComponent) {
  return (
    <>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleOnChange}>
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
