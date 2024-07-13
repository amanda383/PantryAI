import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { TouchableOpacity } from 'react-native';

export default function CameraScreen() {
    const cameraRef = useRef<CameraView>(null);
    const [picture, setPicture] = useState<string>(""); // State to hold the captured picture URI

    const [facing, setFacing] = useState<'back' | 'front'>('back'); // State to toggle between front and back camera
    const [permission, requestPermission] = useCameraPermissions();

    // Function to handle taking a picture
    async function handleTakePicture() {
        const response = await cameraRef.current?.takePictureAsync({});
        if (response?.uri) {
            setPicture(response.uri);
        } else {
            console.log("Failed to take picture");
            // Handle error or display a message to the user
        }
    }
    //function to store picture and then analyze with tensorflow
    {/* */}
    
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black', // Ensure camera preview background is black or transparent
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute', // Position buttons over the camera preview
        bottom: 20,
        left: 0,
        right: 0,
    },
    button: {
        padding: 20,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
