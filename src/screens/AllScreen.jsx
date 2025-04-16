import { View } from "react-native"
import All from "../components/All"

const AllScreen = () => {
    return (
        <View style={styles.container}>
            <All />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AllScreen;