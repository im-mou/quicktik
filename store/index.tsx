import { createContext, useContext } from 'react';
import { RootStore } from './RootStore';
import GroupsStore from './GroupsStore';

/**
 * Instantiation and Export of store elements
 */
const rootStore = new RootStore();

type TStores = {
    RootStore: RootStore;
    GroupsStore: GroupsStore;
};

export const stores: TStores = {
    RootStore: rootStore,
    GroupsStore: rootStore.GroupsStore
};

const StoreContext = createContext<TStores>({} as TStores);

/* Store helpers */
export const StoreProvider = ({ children }: { children: any }) => {
    const stores: TStores = {
        RootStore: rootStore,
        GroupsStore: rootStore.GroupsStore
    };

    return (
        <StoreContext.Provider value={{ ...stores } as TStores}>
            {children}
        </StoreContext.Provider>
    );
};

/* Hook to use store in any functional component */
export const useStore = () => useContext(StoreContext);

/* HOC to inject store to any functional or class component */
export const withStore = (Component: any) => (props: any) => {
    return <Component {...props} store={useStore()} />;
};

export default stores;
