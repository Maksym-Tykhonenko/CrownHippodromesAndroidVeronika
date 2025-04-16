import { View } from "react-native"
import Explain from "../components/Explain"

const ExplainScreen = () => {
    return (
        <View style={styles.container}>
            <Explain />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ExplainScreen;