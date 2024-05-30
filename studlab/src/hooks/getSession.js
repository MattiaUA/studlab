import { Preferences } from '@capacitor/preferences';

export async function getSession() {
    const user = await Preferences.get({ key: 'UserData' });
    //console.log("getSession",user)
    return user;
}