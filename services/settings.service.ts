import { IAppConfig, IGroup, IUserConfig, TPouchError } from '../types';
import BaseService from './base.service';

class SettingsService extends BaseService {
    // check if app has been initialized
    isAppInitialized = async () => {
        try {
            // get app config data from db
            let appConfig = await this.db.config.get<IAppConfig>(
                this.db.constants.APP_CONFIG
            );

            return Boolean(appConfig.app_is_initialized);
        } catch (e: any) {}
    };

    // initialize the app with initial required data
    initializeAppData = async ({
        group,
        userData
    }: {
        group: IGroup;
        userData: { name: string; profile_image: File };
    }) => {
        try {
            // get app config data from db
            let appConfig = await this.getAppSettings();

            // if app is not initialized, we'll do it now
            if (!appConfig.app_is_initialized) {
                // We will create a new empty board
                const newGroup = await this.db.groups.post<IGroup>(group);

                /**
                 * Save user data and create new group
                 */
                await new Promise((resolve, reject) => {
                    this.getUserSettings()
                        .then((doc) => {
                            // Update and save keys
                            doc.name = userData.name;
                            doc.selected_group_id = newGroup.id;

                            // save user profile image
                            if (userData.profile_image) {
                                doc._attachments = {
                                    profile_image: {
                                        content_type:
                                            userData.profile_image.type,
                                        data: userData.profile_image
                                    }
                                };
                            }

                            this.db.config.put(doc);

                            resolve(doc);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });

                /**
                 * Get APP CONFIG data to mark the app as initialized
                 */
                await new Promise((resolve, reject) => {
                    this.getAppSettings()
                        .then((doc) => {
                            // Update and save keys
                            doc.app_is_initialized = 1;
                            this.db.config.put(doc);

                            resolve(doc);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            }
        } catch (e) {
            throw new Error('Something went wrong while initializing the app');
        }
    };

    // Get user settings data
    getUserSettings = async (): Promise<IUserConfig> => {
        // Insert empty field if not present
        await this.db.config.putIfNotExists<IUserConfig>({
            _id: this.db.constants.USER_CONFIG
        });
        return this.db.config.get<IUserConfig>(this.db.constants.USER_CONFIG);
    };

    // Get user settings data
    getAppSettings = async (): Promise<IAppConfig> => {
        // Insert empty field if not present
        await this.db.config.putIfNotExists<IAppConfig>({
            _id: this.db.constants.APP_CONFIG,
            initialization_timestamp: +new Date(),
            app_version: 'alpha' // @Todo: use git version
        });

        return this.db.config.get<IAppConfig>(this.db.constants.APP_CONFIG);
    };

    // Get user profile image
    getUserProfileImage = async () => {
        return this.db.config.getAttachment(
            this.db.constants.USER_CONFIG,
            'profile_image'
        );
    };
}
export const settingsService = new SettingsService();
