import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import PersonalInfo from '@/app/screens/personalInfo';
import {useRouter} from 'expo-router';

export default function MyScreen() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoggedIn) {
            router.push('/screens/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null;
    }

    return <PersonalInfo/>;
}
