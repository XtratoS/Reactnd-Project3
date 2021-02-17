import React, { useState, useEffect } from 'react';
import { Text, Platform, Switch, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { setLoading } from '../actions/loadingIndicator';
import { getLocalNotification, setLocalNotification } from '../utils/api';
import Loading from './Loading';
import { Btn, Container, Section } from './WrapperComponents';

function SettingsScreen(props) {
  const [time, setTime] = useState(new Date(Date.now()));
  const [switchState, setSwitchState] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setLoading(true);

    getLocalNotification()
      .then(async (notification) => {

        if (!notification) {
          setSwitchState(false);
        }

        if (notification) {
          let triggerTimestamp;
          
          if (Platform.OS === 'ios') {
            triggerTimestamp = Math.floor((Date.now() + (notification.trigger.seconds % (24*60*60)) * 1000) / 60000) * 60000;
          } else {
            triggerTimestamp = Math.floor(notification.trigger.value / 60000) * 60000;
          }

          if (triggerTimestamp) {
            setTime(new Date(triggerTimestamp));
            setSwitchState(true);
            if (Platform.OS === 'ios') {
              setShowPicker(true);
            }
          }
        }

        setLoading(false);
      })
  }, []);

  function onChange(event, newDate) {
    setShowPicker(Platform.OS === 'ios');

    if (event.type === 'dismissed') {
      setSwitchState(!switchState);
      return;
    }
    
    if (newDate && typeof newDate === 'object') {
      setTime(newDate);
    }
  }

  function toggleSwitch() {
    if (!switchState === true) {
      setShowPicker(true);
    }
    setSwitchState(!switchState);
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
      <Container center>
        <Section center>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 24, marginRight: 24}}>Notifications</Text>
            <Switch
              value={switchState}
              onValueChange={toggleSwitch}
            />
          </View>
        </Section>
        <Section center disabled={!switchState} disabledOpacity={0.3}>
        {showPicker && (
          <DateTimePicker
            style={{width: '100%'}}
            testID='dateTimePicker'
            value={time}
            mode='time'
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            onChange={onChange}
          />
        )}
        </Section>
        <Section center={true}>
          <Btn
            color='darkgreen'
            textColor='white'
            onPress={submitChanges}
          >
            Save Changes
          </Btn>
        </Section>
      </Container>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loadingIndicator,
  }
}

function mapDispatchToProps() {

}

export default connect(mapStateToProps, { setLoading })(SettingsScreen);