import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';

// Dummy data for demonstration
const dummyData = [
    { id: '1', title: 'Item 1', category: 'Category A', description: 'Description for Item 1' },
    { id: '2', title: 'Item 2', category: 'Category B', description: 'Description for Item 2' },
    { id: '3', title: 'Item 3', category: 'Category A', description: 'Description for Item 3' },
    { id: '4', title: 'Item 4', category: 'Category C', description: 'Description for Item 4' },
    { id: '5', title: 'Item 5', category: 'Category B', description: 'Description for Item 5' },
];

const categories = ['All', 'Category A', 'Category B', 'Category C'];

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(dummyData);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleSearch = (query) => {
        setSearchQuery(query);
        filterData(query, selectedCategory);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        filterData(searchQuery, category);
    };

    const filterData = (query, category) => {
        let filtered = dummyData;
        if (query) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );
        }
        if (category !== 'All') {
            filtered = filtered.filter(item => item.category === category);
        }
        setFilteredData(filtered);
    };

    const renderItem = ({ item }) => (
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
            <Text className="text-lg font-bold mb-2">{item.title}</Text>
            <Text className="text-sm text-gray-600 mb-2">{item.category}</Text>
            <Text className="text-sm">{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <StatusBar style="auto" />
            <View className="p-4">
                <View className="flex-row items-center bg-white rounded-full shadow-sm mb-4">
                    <FontAwesome name="search" size={20} color="gray" className="ml-3" />
                    <TextInput
                        className="flex-1 p-2 pl-3"
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleCategorySelect(item)}
                            className={`px-4 py-2 mr-2 rounded-full ${
                                selectedCategory === item ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        >
                            <Text className={`${
                                selectedCategory === item ? 'text-white' : 'text-gray-800'
                            }`}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    className="mb-4"
                />
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text className="text-center text-gray-500">No results found</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
}