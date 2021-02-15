import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Switch, Platform } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime } from '../utils/helpers';
import { setLocalNotification, getLocalNotification } from '../utils/api';
import { setLoading } from '../actions/loadingIndicator';
import Loading from './Loading';

function SettingsScreen(props) {
    const [showPicker, setShowPicker] = useState(false);
    const [switchState, setSwitch] = useState(true);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        props.setLoading(true);
        getLocalNotification().then((notification) => {
            if (!notification) {
                setSwitch(false);
            }
            else if (notification.trigger.value){
                setSwitch(true);
                setTime(notification.trigger.value);
            }
            props.setLoading(false);
        });
    }, [])

    function togglePicker() {
        setShowPicker(!showPicker);
    }

    function handleTimeChange(event, newTime) {
        togglePicker();
        if (newTime) {
            setTime(event.nativeEvent.timestamp);
        }
    }

    function submitChanges() {
        props.setLoading(true);
        if (switchState === true) {
            setLocalNotification(time).then(() => {props.setLoading(false);});
        } else {
            setLocalNotification(null).then(() => {props.setLoading(false);});
        }
        props.navigation.goBack();
    }

    if (props.loading === true) {
        return <Loading />
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
                <Text style={[styles.settingLabel, {color: switchState ? 'black' : 'grey'}]}>
                    Reminder Time
                </Text>
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
            {showPicker &&
            <View style={{flex: 1, width: '100%'}}>
                <DateTimePicker
                    style={{width:'100%'}}
                    is24Hour={false}
                    display={Platform.OS === 'ios' && 'spinner'}
                    mode='time'
                    value={time}
                    onChange={handleTimeChange}
                />
            </View>}
            <View style={[styles.settingGroup, styles.saveBtnContainer]}>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: 'darkgreen' }]}
                    onPress={() => {submitChanges()}}
                >
                    <Text style={{fontSize: 24, color: 'white'}}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        loading: state.loadingIndicator,
    }
}

export default connect(mapStateToProps, { setLoading })(SettingsScreen)

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
    saveBtnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})