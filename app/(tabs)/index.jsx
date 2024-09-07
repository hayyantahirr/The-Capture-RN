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

/**
 * This is the HomeScreen component for a React Native application.
 * It allows users to take pictures using the camera and display them in a gallery.
 * The component manages the camera view, permission handling, and the gallery of captured images.
 */
export default function HomeScreen() {
  // State to manage which camera is being used (front or back).
  // Initially, the camera is set to the "back" facing mode.
  const [facing, setFacing] = useState("back");

  // State and function for handling camera permissions.
  // `permission` holds the current state of the camera permissions (granted or not).
  // `requestPermission` is a function to request camera permissions from the user.
  const [permission, requestPermission] = useCameraPermissions();

  // useRef hook to create a reference for the camera instance.
  // This allows direct access to the camera for taking pictures.
  const camera = useRef(null);

  // State to manage the currently captured image.
  // `images` stores the most recently taken picture.
  const [images, setImages] = useState();

  // State to manage the gallery of captured images.
  // `Gallery` is an array that holds all captured pictures.
  const [Gallery, setGallery] = useState([]);

  // Checking if the camera permissions are still loading or haven't been granted yet.
  // If permissions are not yet resolved, render an empty view.
  if (!permission) {
    return <View />;
  }

  // If the camera permissions are not granted, prompt the user to grant permissions.
  if (!permission.granted) {
    return (
      <View style={style.container}>
        {/* Message asking for camera permissions */}
        <Text style={style.message}>
          We need your permission to show the camera
        </Text>

        {/* Button to request camera permissions when clicked */}
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  /**
   * Function to toggle the camera between front and back facing modes.
   * If the current mode is "back", it switches to "front", and vice versa.
   */
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  /**
   * Function to take a picture using the camera.
   * The picture is captured by the camera instance and then added to the gallery.
   * The most recent image is also stored in the `images` state.
   */
  async function takepicture() {
    // Capture the picture using the camera reference
    const picture = await camera.current.takePictureAsync();
    console.log("picture", picture);

    // Store the captured picture in the `images` state
    setImages(picture);

    // Add the captured picture to the gallery array
    setGallery([...Gallery, picture]);
    console.log("Gallery", Gallery);
  }

  /**
   * Function to delete a picture from the gallery.
   * The picture is removed from the gallery array by its index.
   * An alert is shown confirming the picture was successfully removed.
   *
   * @param {number} id - The index of the picture in the gallery to be deleted.
   */
  const dltPicture = async (id) => {
    // Create a copy of the gallery array
    const newgallery = [...Gallery];

    // Remove the picture from the gallery using its index
    await newgallery.splice(id, 1);

    // Update the gallery state with the new array
    setGallery(newgallery);

    // Alert the user that the picture was successfully removed
    Alert.alert("Picture Remove successfully");
  };

  return (
    <>
      {/* Header section containing the title and subtitle */}
      <View style={style.titlecontainer}>
        <Text style={style.title}>The Capture</Text>
        <Text style={style.subtitle}>Created by React Native</Text>
      </View>

      {/* Main camera container that holds the camera view and controls */}
      <View style={style.cameraContainer}>
        <CameraView style={style.camera} facing={facing} ref={camera}>
          {/* Button to flip the camera between front and back facing */}
          <View style={style.cameraContainer}>
            <TouchableOpacity style={style.button} onPress={toggleCameraFacing}>
              <Text style={style.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {/* Section for capturing images and displaying the gallery */}
      <View style={style.buttonContainer}>
        {/* Button to capture the picture */}
        <Button title="Capture Your Moment !" onPress={takepicture} />

        {/* Horizontal scrollable view to display the gallery of captured images */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          className="overflow-hidden py-3"
        >
          {Gallery.map((img, index) => (
            <View key={index} style={{ position: "relative", marginRight: 10 }}>
              {/* Delete button overlaying each image in the gallery */}
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

              {/* Display the image captured by the camera */}
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
