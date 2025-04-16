import { View } from "react-native"
import Seasonal from "../components/Seasonal"

const SeasonalScreen = () => {
    return (
        <View style={styles.container}>
            <Seasonal />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default SeasonalScreen;