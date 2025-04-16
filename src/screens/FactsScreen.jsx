import { View } from "react-native"
import Facts from "../components/Facts"

const FactsScreen = () => {
    return (
        <View style={styles.container}>
            <Facts />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FactsScreen;