import { View } from "react-native"
import Blog from "../components/Blog"

const BlogScreen = () => {
    return (
        <View style={styles.container}>
            <Blog />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default BlogScreen;