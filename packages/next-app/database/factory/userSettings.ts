import Database from '..';
import { IUserSettings } from '../../types';
import { helpers } from '../../utils/helpers';
import GroupFactory from './group';

export default class UserSettingsFactory {
    public create = async (data?: Partial<IUserSettings>) => {
        const instance = Database.getInstance();

        try {
            // create a rendom group
            const group = await new GroupFactory().create();

            // creata  random user and apply seetings
            await instance.settings.put<IUserSettings>({
                _id: instance.constants.USER_SETTINGS,
                name: 'user-name-' + helpers.uuid().slice(0, 5),
                selected_group_id: group._id,
                ...data
            });

            // return created instance
            return instance.settings.get<IUserSettings>(instance.constants.USER_SETTINGS);
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
