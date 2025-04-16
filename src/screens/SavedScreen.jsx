import { View } from "react-native"
import Saved from "../components/Saved"

const SavedScreen = () => {
    return (
        <View style={styles.container}>
            <Saved />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default SavedScreen;