import { View } from "react-native"
import Surprise from "../components/Surprise"

const SurpriseScreen = () => {
    return (
        <View style={styles.container}>
            <Surprise />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default SurpriseScreen;