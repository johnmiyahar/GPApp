import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList, Button, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {
        margin: 10,
        padding: 10
    },
    opacityStyle: {
        borderWidth: 1,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightgray',
    },
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    imageStyle: {
        width: 250,
        height: 300,
        margin: 10
    },
});

const gradePoints = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0
};

const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    datasource.forEach(section => {
        section.data.forEach(module => {
            const gradePoint = gradePoints[module.grade];
            const credits = parseFloat(module.credit);
            totalPoints += gradePoint * credits;
            totalCredits += credits;
        });
    });

    const cGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;

    Alert.alert("Cumulative GPA", `Your cGPA is ${cGPA}!`);
};

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
                navigation.navigate("Edit", {
                    sectionIndex: datasource.indexOf(section),
                    itemIndex: index,
                    currentModule: item,
                })
            }
        >
            <Text style={styles.textStyle}>{item.code}</Text>
            <Text style={styles.textStyle}>{item.name}</Text>
            <Text style={styles.textStyle}>{item.credit}</Text>
            <Text style={styles.textStyle}>{item.grade}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Add Module" onPress={() => navigation.navigate("Add")} />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgColor, iconColor, iconName } }) => (
                    <View style={[styles.headerContainer, { backgroundColor: bgColor }]}>
                        <Icon name={iconName} size={20} color={iconColor} />
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.code}
            />
            <Button title="Calculate cGPA" onPress={calculateGPA} />
        </View>
    );
};

export default Home;
