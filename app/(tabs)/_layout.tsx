import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
}) {
    return <AntDesign size={24} {...props} />;
}


export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarInactiveTintColor: '#888888',
                headerShown: useClientOnlyValue(false, true),
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="courses"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Courses',
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />,
                }}
            />
            <Tabs.Screen
                name="sections"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Sections',
                    tabBarIcon: ({ color }) => <TabBarIcon name="appstore-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />


        </Tabs>
    );
}
