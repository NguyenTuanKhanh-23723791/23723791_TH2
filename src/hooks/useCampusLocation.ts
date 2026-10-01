import { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';

// Tọa độ cổng KTX (cố định)
const KTX_GATE = { lat: 10.8222, lon: 106.6874 };

function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const useCampusLocation = () => {
    const [status, setStatus] = useState<'idle' | 'granted' | 'denied' | 'blocked'>('idle');
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [calculatedFee, setCalculatedFee] = useState<number | null>(null);

    const requestAndGetFee = async () => {
        try {
            // Request location permission
            let permissionGranted = false;
            if (Platform.OS === 'android') {
                const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!hasPermission) {
                    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    if (result === PermissionsAndroid.RESULTS.GRANTED) {
                        permissionGranted = true;
                    } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                        setStatus('blocked');
                        return null;
                    } else {
                        setStatus('denied');
                        return null;
                    }
                } else {
                    permissionGranted = true;
                }
            } else {
                // iOS permission request
                const auth = await (Geolocation as any).requestAuthorization();
                if (auth === 'granted') {
                    permissionGranted = true;
                } else {
                    setStatus('denied');
                    return null;
                }
            }

            if (!permissionGranted) {
                setStatus('denied');
                return null;
            }

            setStatus('granted');

            // Get current position using Geolocation
            const position = await new Promise((resolve, reject) => {
                (Geolocation as any).getCurrentPosition(
                    (pos: any) => resolve(pos),
                    (err: any) => reject(err),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            });

            const km = calculateHaversineKm(
                (position as any).coords.latitude,
                (position as any).coords.longitude,
                KTX_GATE.lat,
                KTX_GATE.lon
            );
            setDistanceKm(km);

            let fee = 0;
            if (VARIANT.shipFormula === 'A') {
                fee = BASE_SHIP_FEE + Math.round(km * 2000);
            } else {
                fee = BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
            }

            setCalculatedFee(fee);
            return fee;
        } catch (e) {
            setStatus('denied');
            return null;
        }
    };

    const openSettings = () => {
        Linking.openSettings();
    };

    return {
        status,
        distanceKm,
        calculatedFee,
        requestAndGetFee,
        openSettings,
    };
};