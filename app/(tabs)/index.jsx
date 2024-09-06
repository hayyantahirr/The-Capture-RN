import style from "../../styles/home-css";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function HomeScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={style.container}>
        <Text style={style.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <>
      <View style={style.titlecontainer} >
        <Text style={style.title}>The Capture</Text>
        <Text style={style.subtitle}>Created by React Native</Text>
      </View>
      <View style={style.cameraContainer}>
        <CameraView style={style.camera} facing={facing}>
          <View style={style.buttonContainer}>
            <TouchableOpacity style={style.button} onPress={toggleCameraFacing}>
              <Text style={style.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
      <Button title="Capture Your Moment!" />
    </>
  );
}
