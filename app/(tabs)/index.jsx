import { Text, View } from "react-native";
import style from "../../styles/home-css";

export default function HomeScreen() {
  return (
    <>
      <View style={style.titlecontainer}>
        <Text style={style.title}>The Capture </Text>
        <Text style={style.subtitle}>Created by React native </Text>
      </View>
      <View>
        
      </View>
    </>
  );
}
