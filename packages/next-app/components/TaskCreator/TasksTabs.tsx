import { DEFAULT_THEME, Tabs } from '@mantine/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStore } from '../../store';

const TasksTabs = observer(() => {
    // Global state
    const { GroupsStore } = useStore();

    const groupColor = GroupsStore.selectedGroup.color || DEFAULT_THEME.colors.gray[2];

    // Tabs local state
    const [activeTab, setActiveTab] = useState(0);
    const onChange = (active: number, tabKey: string) => {
        setActiveTab(active);
        console.log('tabKey', tabKey);
    };

    return (
        <Tabs
            styles={{
                tabsListWrapper: { borderBottom: 'none !important' }
            }}
            sx={(theme) => ({
                '& button': {
                    fontWeight: 'bold',
                    color: theme.colors.gray[5]
                },
                '& button[class*="tabActive"]': {
                    // cannot set active tab bottom border color from mantine api
                    borderColor: groupColor,
                    borderWidth: 3,
                    color: groupColor
                }
            })}
            active={activeTab}
            onTabChange={onChange}
            position="center"
        >
            <Tabs.Tab label="Tasks for Today" tabKey="First" />
            <Tabs.Tab label="Upcoming Tasks" tabKey="Second" />
        </Tabs>
    );
});

export default TasksTabs;
