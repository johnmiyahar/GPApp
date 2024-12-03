import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data.js';
import { Picker } from '@react-native-picker/picker';

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
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 20
    },
});

const Add = ({ navigation }) => {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [credit, setCredit] = useState("");
    const [grade, setGrade] = useState("");
    const [type, setType] = useState("General Modules");

    const handleSubmit = () => {
        if (code && name && credit && grade) {
            const sectionIndex = datasource.findIndex((section) => section.title === type);
            datasource[sectionIndex].data.push({ code, name, credit, grade});

            Alert.alert("Success", `Added ${name} to ${type}!`);
            navigation.navigate("Home");
        } else {
            Alert.alert("Error", "Please input your module details again!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Module Code:</Text>
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
                placeholder="Enter Module Code"
            />
            <Text style={styles.label}>Module Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Module Name"
            />
            <Text style={styles.label}>Module Credits:</Text>
            <TextInput
                style={styles.input}
                value={credit}
                onChangeText={setCredit}
                placeholder="Enter Number of Module Credits"
            />
            <Text style={styles.label}>Module Grade:</Text>
            <TextInput
                style={styles.input}
                value={grade}
                onChangeText={setGrade}
                placeholder="Enter Module Grade"
            />
            <Text style={styles.label}>Type:</Text>
            <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
                {datasource.map((section) => (
                    <Picker.Item key={section.title} label={section.title} value={section.title} />
                ))}
            </Picker>
            <Button title="Add Module Details" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
