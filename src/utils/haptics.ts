import { Vibration } from 'react-native';

export const hapticImpact = () => Vibration.vibrate(20);

export const hapticSelection = () => Vibration.vibrate(10);