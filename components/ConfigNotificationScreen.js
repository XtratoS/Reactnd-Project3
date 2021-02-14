import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Switch, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { handleSetTime } from '../actions';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

function formatTime(input) {
    console.log('input', input)
    let date;
    if (typeof(input) === 'number') {
        date = new Date(input)
    }
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let AP = hrs > 11 ? 'PM' : 'AM';
    hrs = hrs > 9 ? hrs : `0${hrs}`;
    mins = mins > 9 ? mins : `0${mins}`;
    return `${hrs}: ${mins} ${AP}`;
}

function ConfigNotificationScreen(props) {
    const [showPicker, setShowPicker] = useState(false);
    const [switchState, setSwitch] = useState(true);
    const [time, setStateTime] = useState(Date.now());

    useEffect(() => {
        if (props.time) {
            setStateTime(props.time);
        } else {
            setSwitch(false);
        }
    }, [props.time])

    function togglePicker() {
        setShowPicker(!showPicker);
    }

    function handleTimeChange(event, newTime) {
        togglePicker();
        if (newTime) {
            setStateTime(event.nativeEvent.timestamp);
        }
    }

    function submitChanges() {
        if (switchState === true) {
            props.setTime(time);
        } else {
            props.setTime(null);
        }
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.settingGroup}>
                <Text style={styles.settingLabel}>Daily Reminder</Text>
                <Switch
                    value={switchState}
                    onValueChange={(value) => {setSwitch(value)}}
                />
            </View>
            <View style={styles.settingGroup}>
                <Text style={[styles.settingLabel, {color: switchState ? 'black' : 'grey'}]}>Reminder Time</Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 6,
                        borderWidth: 1,
                        borderRadius: 8,
                    }}
                    disabled={!switchState}
                    onPress={() => {togglePicker()}}
                >
                    <Text style={{fontSize: 20, color: switchState ? 'black' : 'grey'}}>
                        {formatTime(time)}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.settingGroup, {flex: 1, justifyContent: 'center', alignItems: 'flex-end'}]}>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: 'darkgreen' }]}
                    onPress={() => {submitChanges()}}
                >
                    <Text style={{fontSize: 24, color: 'white'}}>Save Changes</Text>
                </TouchableOpacity>
            </View>
            {showPicker &&
            <View>
                <DateTimePicker
                    mode='time'
                    value={time}
                    onChange={handleTimeChange}
                />
            </View>}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        time: state.dailyReminderTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTime: (time) => dispatch(handleSetTime(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigNotificationScreen)

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    settingGroup: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 16
    },
    settingLabel: {
        marginHorizontal: 4,
        width: 180,
        fontSize: 20
    },
    btn: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        width: 180,
        alignItems: 'center',
        marginVertical: 10
    },
})