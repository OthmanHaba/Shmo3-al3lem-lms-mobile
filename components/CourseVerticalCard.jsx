import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styled } from 'nativewind';

const Card = styled(View, 'flex-row p-4 rounded-lg bg-white shadow-md mb-4 items-center');
const CardImage = styled(Image, 'w-1/3 h-full rounded-xl mr-4');
const CardContent = styled(View, 'flex-1');
const CardTitle = styled(Text, 'text-lg font-bold mb-1 text-right');
const CardAuthor = styled(Text, 'text-sm text-gray-600 mb-1 text-right');
const CardRow = styled(View, 'flex-row items-center mb-1 justify-end');
const CardRating = styled(Text, 'text-sm ml-1 mr-2 text-gray-800');
const CardDuration = styled(Text, 'text-sm text-gray-600');
const CardPrice = styled(Text, 'text-base font-bold text-red-500 text-right');

const CourseVerticalCard = () => {
  return (
    <Card>
      <CardImage
        source={{ uri: 'https://via.placeholder.com/60' }} // Replace with your image URL
      />
      <CardContent>
        <CardTitle>رياضة 2- (نصفي)</CardTitle>
        <CardAuthor>بواسطة محمد احمد</CardAuthor>
        <CardRow>
          <FontAwesome name="star" size={16} color="gold" />
          <CardRating>4.6</CardRating>
          <CardDuration>4 ساعات و 30 دقيقة</CardDuration>
        </CardRow>
        <CardPrice>24 دينار</CardPrice>
      </CardContent>
    </Card>
  );
};

export default CourseVerticalCard;
