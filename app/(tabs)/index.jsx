import style from "../../styles/home-css";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
// import { CameraType } from "expo-camera/build/legacy/Camera.types";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

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
  return (
    <>
      <View style={style.titlecontainer}>
        <Text style={style.title}>The Capture</Text>
        <Text style={style.subtitle}>Created by React Native</Text>
      </View>
      <View style={style.cameraContainer}>
        <CameraView style={style.camera} facing={facing}>
          <View style={style.cameraContainer}>
            <TouchableOpacity style={style.button} onPress={toggleCameraFacing}>
              <Text style={style.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
      <View style={style.buttonContainer}>
        <Button title="Capture Your Moment !" />
      </View>
    </>
  );
}
