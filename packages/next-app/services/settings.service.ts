import { IAppSettings, IGroup, IUserSettings } from '../types';
import BaseService from './base.service';

class SettingsService extends BaseService {
    // check if app has been initialized
    isAppInitialized = async () => {
        try {
            // get app settings data from db
            let appSettings = await this.db.settings.get<IAppSettings>(this.db.constants.APP_SETTINGS);

            return Boolean(appSettings.app_is_initialized);
        } catch (e: any) {}
    };

    // initialize the app with initial required user data and a new board
    initializeAppData = async ({
        group,
        userData
    }: {
        group: IGroup;
        userData: { name: string; profile_image?: File };
    }) => {
        if (!group || !userData) throw new Error('Some of the required data was not provided');

        try {
            // get app settings data from db
            let appSettings = await this.getAppSettings();

            // if app is not initialized, we'll do it now
            if (!appSettings.app_is_initialized) {
                // We will create a new empty board
                const newGroup = await this.db.groups.post<IGroup>(group);

                /**
                 * Save user data and create new group
                 */
                const userSettings = await this.getUserSettings();

                // Update and save keys
                userSettings.name = userData.name;
                userSettings.selected_group_id = newGroup.id;

                // save user profile image
                if (userData.profile_image) {
                    userSettings._attachments = {
                        profile_image: {
                            content_type: userData.profile_image.type,
                            data: userData.profile_image
                        }
                    };
                }

                // Store user setting data into to db
                await this.db.settings.put(userSettings);

                /**
                 * Get APP CONFIG data to mark the app as initialized
                 */
                const appSettings = await this.getAppSettings();

                // Update and save keys
                appSettings.app_is_initialized = 1;
                await this.db.settings.put(appSettings);
            }
        } catch (e) {
            throw new Error('Something went wrong while initializing the app');
        }
    };

    // Get user settings data
    getUserSettings = async (): Promise<IUserSettings> => {
        return this.db.settings.get<IUserSettings>(this.db.constants.USER_SETTINGS);
    };

    // Get user settings data
    getAppSettings = async (): Promise<IAppSettings> => {
        return this.db.settings.get<IAppSettings>(this.db.constants.APP_SETTINGS);
    };

    // Get user profile image
    getUserProfileImage = async () => {
        return this.db.settings.getAttachment(this.db.constants.USER_SETTINGS, 'profile_image');
    };
}
export const settingsService = new SettingsService();
