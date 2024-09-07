import style from "../../styles/home-css";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
// import { CameraType } from "expo-camera/build/legacy/Camera.types";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef(null);
  const [images, setImages] = useState();
  const [Gallery, setGallery] = useState([]);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={style.container}>
        <Text style={style.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  async function takepicture() {
    const picture = await camera.current.takePictureAsync();
    console.log("picture", picture);
    setImages(picture);
    setGallery([...Gallery, picture]);
    console.log("Gallery", Gallery);
  }
  const dltPicture = async (id) => {
    const newgallery = [...Gallery];
    await newgallery.splice(id, 1);
    setGallery(newgallery);
    Alert.alert("Picture Remove successfully");
  };

  return (
    <>
      <View style={style.titlecontainer}>
        <Text style={style.title}>The Capture</Text>
        <Text style={style.subtitle}>Created by React Native</Text>
      </View>
      <View style={style.cameraContainer}>
        <CameraView style={style.camera} facing={facing} ref={camera}>
          <View style={style.cameraContainer}>
            <TouchableOpacity style={style.button} onPress={toggleCameraFacing}>
              <Text style={style.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
      <View style={style.buttonContainer}>
        <Button title="Capture Your Moment !" onPress={takepicture} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          className="overflow-hidden py-3"
        >
          {Gallery.map((img, index) => (
            <View key={index} style={{ position: "relative", marginRight: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#fa1919",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 50,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
                onPress={() => dltPicture(index)}
              >
                <Text style={{ color: "white", fontSize: 20 }}>x</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: img.uri }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
