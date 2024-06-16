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

//Define a estrutura de um tipo de Pokémon na PokéAPI.
interface PokeType {
  type: {
    name: string;
  };
}
// Define a estrutura da resposta da API ao buscar informações de um Pokémon.
interface PokeResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokeType[];
}
// Define a estrutura dos dados de um Pokémon formatados para uso no aplicativo.
interface PokeData {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export function Home() {
  const [dataApi, setDataApi] = useState<PokeData | null>(null);
  const [filterName, setFilterName] = useState<string>("");
  const navigator = useNavigation();

  const fetchPoke = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`; // Constrói a URL da API usando o nome do Pokémon em letras minúsculas
    try {
      const response = await axios.get<PokeResponse>(url); // Faz uma requisição GET para a URL usando Axios
      const { id, name: pokeName, sprites, types } = response.data; // Extrai os dados relevantes da resposta da API
      setDataApi({
        id,
        name: pokeName,
        image: sprites.front_default,
        types: types.map((typeInfo) => typeInfo.type.name),
      });
    } catch (error) {
      console.log("Error fetching Pokémon data:", error);
    }
  };

  //  limpa os dados atuais e busca os dados após uma pausa de 1 segundos desde a última digitação, evitando chamadas excessivas à API.
  const handleSearch = useCallback(
    debounce((name: string) => {
      setDataApi(null);
      if (name) {
        fetchPoke(name);
      }
    }, 1000),
    []
  );

  // O useEffect chama handleSearch com o valor de filterName sempre que filterName ou handleSearch mudam, iniciando uma busca debounced pelos dados do Pokémon.
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
          <View style={styles.card}>
            {dataApi && (
              <View>
                <Text style={styles.text}>{dataApi.name}</Text>
                <Image source={{ uri: dataApi.image }} style={styles.image} />
                <Text style={styles.text}>
                  Type: {dataApi.types.join(", ")}
                </Text>
              </View>
            )}
            {!dataApi && filterName.trim() !== "" && (
              <View>
                <Text style={styles.text}>Not Found</Text>
              </View>
            )}
          </View>

          <ButtonComponent title="Voltar" handleOnChange={handleLogout} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
