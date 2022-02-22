import { IAppConfig, IGroup, IUserConfig } from '../types';
import BaseService from './base.service';

class SettingsService extends BaseService {
    // check if app has been initialized
    isAppInitialized = async () => {
        try {
            // get app config data from db
            let appConfig = await this.db.config.get<IAppConfig>(
                this.db.constants.config.APP_CONFIG
            );

            return Boolean(appConfig.app_is_initialized);
        } catch (e) {
            console.error(e);
        }
    };

    // initialize the app with initial required data
    setupApp = async ({
        group,
        userData
    }: {
        group: IGroup;
        userData: Pick<IUserConfig, 'name' | 'profile_image'>;
    }) => {
        try {
            // get app config data from db
            let appConfig = await this.db.config.get<IAppConfig>(
                this.db.constants.config.APP_CONFIG
            );

            return;

            // if app is not initialized, we'll do it now
            if (!appConfig.app_is_initialized) {
                // We will create a new empty board
                const newGroup = await this.db.groups.post<IGroup>(group);

                /**
                 * Save user data and create new group
                 */
                await new Promise((resolve, reject) => {
                    this.db.config
                        .get<IUserConfig>(this.db.constants.config.APP_CONFIG)
                        .then((doc) => {
                            // Update and save keys
                            doc.name = userData.name;
                            doc.selected_group_id = newGroup.id;

                            if (userData.profile_image) {
                                doc.profile_image = userData.name;
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
                    this.db.config
                        .get<IAppConfig>(this.db.constants.config.APP_CONFIG)
                        .then((doc) => {
                            // Update and save keys
                            doc.app_is_initialized = true;
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
}
export const settingsService = new SettingsService();
