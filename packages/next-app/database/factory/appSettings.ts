import Database from '..';
import { IAppSettings } from '../../types';
import { helpers } from '../../utils/helpers';
import GroupFactory from './group';

export default class AppSettingsFactory {
    public create = async (data?: Partial<IAppSettings>) => {
        const instance = Database.getInstance();

        try {
            // creata  random user and apply seetings
            await instance.settings.put<IAppSettings>({
                _id: instance.constants.APP_SETTINGS,
                app_is_initialized: 1,
                initialization_timestamp: +new Date(),
                app_version: 'version',
                ...data
            });

            // return created instance
            return instance.settings.get<IAppSettings>(instance.constants.APP_SETTINGS);
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
