import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import _, { debounce } from "lodash";
import { styles } from "./style";
import banner from "../../Assets/banner.jpg";
import { TextInputComponent } from "../../Components/TextInput";
import { useNavigation } from "@react-navigation/native";
import { ButtonComponent } from "../../Components/ButtonComponent";

interface PokeType {
  type: {
    name: string;
  };
}

interface PokeResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokeType[];
}

interface PokeData {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export function Home() {
  const [dataApi, setDataApi] = useState<PokeData[]>([]);
  const [filterName, setFilterName] = useState<string>("");
  const navigator = useNavigation();

  const fetchPoke = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    try {
      const response = await axios.get<PokeResponse>(url);
      const { id, name: pokeName, sprites, types } = response.data;
      setDataApi((prevData) => [
        ...prevData,
        {
          id,
          name: pokeName,
          image: sprites.front_default,
          types: types.map((typeInfo) => typeInfo.type.name),
        },
      ]);
    } catch (error) {
      console.log("Error fetching Pokémon data:", error);
    }
  };

  const handleSearch = useCallback(
    debounce((name: string) => {
      setDataApi([]);
      if (name) {
        fetchPoke(name);
      }
    }, 2000), //  delay
    []
  );

  useEffect(() => {
    handleSearch(filterName);
  }, [filterName, handleSearch]);

  const handleLogout = () => {
    navigator.navigate("StackLogin", { name: "Login" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={banner} style={styles.logo} />
        <View style={styles.inputs}>
          <TextInputComponent
            placeholder="Enter Pokémon name or ID"
            value={filterName}
            onChangeValue={setFilterName}
          />
          <FlatList
            style={styles.card}
            data={dataApi}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.text}>{item.name}</Text>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.text}>Type: {item.types.join(", ")}</Text>
              </View>
            )}
          />
          <ButtonComponent title="Voltar" handleOnChange={handleLogout} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
