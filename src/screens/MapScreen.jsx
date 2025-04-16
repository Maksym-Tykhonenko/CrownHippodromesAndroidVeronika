import { View } from "react-native"
import Map from "../components/Map"

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Map />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default MapScreen;