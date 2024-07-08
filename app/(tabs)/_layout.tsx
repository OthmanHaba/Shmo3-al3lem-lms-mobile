import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign } from '@expo/vector-icons';
import { View } from '@/components/Themed';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
    label: string
}) {
    return (
        <AntDesign size={24} {...props} />
    )
}

function SearchIcon(props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
}) {
    return (
        <View className='bg-primray rounded-full p-2 mt-1 '>
            <AntDesign size={24} {...props} />
        </View>
    )
}




export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#F5A437',
                tabBarInactiveTintColor: '#888888',
                headerShown: useClientOnlyValue(false, true),
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingBottom: 10,
                    paddingTop: 5,
                    height: 65,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} label={'الصفحة الرئيسة'} />,
                }}
            />
            <Tabs.Screen
                name="courses"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} label={'كورساتي'} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => <SearchIcon name="search1" color={'white'} />,
                }}
            />
            <Tabs.Screen
                name="sections"
                options={{
                    headerShown: false,
                    tabBarLabel: 'الاقسام',
                    tabBarIcon: ({ color }) => <TabBarIcon name="appstore-o" color={color} label={'الاقسام'} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} label={'الملف الشخصي'} />,
                }}
            />


        </Tabs>
    );
}
