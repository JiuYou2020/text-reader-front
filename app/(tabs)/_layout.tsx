import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    // 获取当前的颜色方案（浅色或深色）
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                // 设置活动标签的颜色
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // 隐藏每个标签页的 header
                headerShown: false,
                // 设置标签位置在图标下方
                tabBarLabelPosition: 'below-icon',
            }}>
            <Tabs.Screen
                // 这里的 name 属性指向 app/(tabs)/index.tsx 文件
                name="index"
                options={{
                    title: '书架',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="my"
                options={{
                    title: '我',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
