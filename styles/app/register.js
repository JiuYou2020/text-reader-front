import {Platform, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    container: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            },
        }),
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        ...Platform.select({
            web: {
                color: '#00796b',
                fontFamily: 'Arial, sans-serif',
            },
        }),
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        ...Platform.select({
            web: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            },
        }),
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007bff',
        textDecorationLine: 'underline',
        ...Platform.select({
            web: {
                cursor: 'pointer',
            },
        }),
    },
});

export default styles;
