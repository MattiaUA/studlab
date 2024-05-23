import { Preferences } from '@capacitor/preferences';

import UsersData from '../exampledata/Users.json';
export async function getSession() {
    const idUser = await Preferences.get({ key: 'idUser' });
    return UsersData.find(u => u.id == idUser.value);
}