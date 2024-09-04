import React from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const { width: screenWidth } = Dimensions.get('window');

const AdCarousel = ({ ads }) => {
    const renderAdItem = ({ item }) => (
        <StyledView className="w-full h-full">
            <StyledImage
                source={{ uri: item.image }}
                className="w-full h-full  rounded-lg"
                resizeMode="cover"
            />
            <StyledView className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg">
                <StyledText className="text-white text-lg font-bold">{item.title}</StyledText>
            </StyledView>
        </StyledView>
    );

    return (
        <StyledView className="h-64 mb-6">
            <FlatList
                data={ads}
                renderItem={renderAdItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                decelerationRate="fast"
                snapToInterval={screenWidth}
            />
        </StyledView>
    );
};

export default AdCarousel;