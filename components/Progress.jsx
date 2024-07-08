import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text,'font-primary text-xs');


const ProgressBar = ({ value }) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const [statues, setStatus] = useState('in Progress');

    useEffect(() => {
        if (clampedValue === 0) {
            setStatus('لم تبدئ بعد');
        } else if (clampedValue > 0 && clampedValue < 100) {
            setStatus('قيد المشاهدة');
        } else if (clampedValue >= 100) {
            setStatus('تمت المشاهدة بالكامل');
        }
    }, [clampedValue]);

    return (
        <StyledView className="w-full">
            <View className="flex flex-row justify-between mb-2">
                <StyledText className="text-right mt-2 text-secondry">
                    {statues}
                </StyledText>
                <StyledText className="text-right mt-2 text-gray-700">
                    {clampedValue}%
                </StyledText>
            </View>
            <StyledView className="h-2 bg-gray-200 rounded-xl overflow-hidden">
                <StyledView
                    className="h-full bg-secondry rounded-full"
                    style={{ width: `${clampedValue}%` }}
                />
            </StyledView>

        </StyledView>
    );
};

export default ProgressBar;