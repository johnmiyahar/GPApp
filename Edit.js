import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
});

const Edit = ({ route, navigation }) => {
    const { sectionIndex, itemIndex, currentModule } = route.params;
    const [code, setCode] = useState(currentModule.code);
    const [name, setName] = useState(currentModule.name);
    const [credit, setCredit] = useState(String(currentModule.credit));
    const [grade, setGrade] = useState(currentModule.grade);

    const handleSave = () => {
        if (code && name && credit && grade) {
            datasource[sectionIndex].data[itemIndex] = { code, name, credit, grade };
            Alert.alert("Success", "Module updated successfully!");
            navigation.navigate("Home");
        } else {
            Alert.alert("Error", "Please re-input your module details!.");
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Module",
            `Are you sure you want to delete ${currentModule.code}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes, Delete",
                    onPress: () => handleDelete(),
                    style: "destructive",
                },
            ]
        );
    };


    const handleDelete = () => {
        datasource[sectionIndex].data.splice(itemIndex, 1);
        Alert.alert("Success", `${currentModule.code} deleted successfully!`);
        navigation.navigate("Home");
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Module Code:</Text>
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
            />
            <Text style={styles.label}>Module Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Module Credits:</Text>
            <TextInput
                style={styles.input}
                value={credit}
                onChangeText={setCredit}

            />
            <Text style={styles.label}>Module Grade:</Text>
            <TextInput
                style={styles.input}
                value={grade}
                onChangeText={setGrade}
            />
            <View style={styles.buttonRow}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Delete" onPress={confirmDelete} color='red' />
            </View>
        </View>
    );
};

export default Edit;
