import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from "react-native-youtube-iframe";
import axiosInstance from '../../../../utils/axios';

export default function VideoPlayerScreen() {
    const route = useRoute();
    const { fileID } = route.params;
    const [videoLink, setVideoLink] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isYouTube, setIsYouTube] = useState(false);
    const [youtubeVideoId, setYoutubeVideoId] = useState('');

    useEffect(() => {
        fetchVideoLink();
        setScreenOrientation();
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    const setScreenOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    const fetchVideoLink = async () => {
        try {
            const response = await axiosInstance.get(`/panel/files/${fileID}`);
            const link = response.data.data.file;
            setVideoLink(link);

            // Check if it's a YouTube link
            if (link.includes('youtube.com') || link.includes('youtu.be')) {
                setIsYouTube(true);
                setYoutubeVideoId(extractYouTubeId(link));
            }
        } catch (error) {
            console.error('Error fetching video link:', error);
        }
    };

    const extractYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setIsPlaying(false);
        }
    }, []);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        // Implement next video logic here
        console.log('Next video');
    };

    const { width } = Dimensions.get('window');

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 justify-center items-center">
                {isYouTube ? (
                    <YoutubePlayer
                        height={width * 0.5625}  // 16:9 aspect ratio
                        width={width}
                        play={isPlaying}
                        videoId={youtubeVideoId}
                        onChangeState={onStateChange}
                    />
                ) : videoLink ? (
                    <Video
                        source={{ uri: videoLink }}
                        className="flex-1 w-full"
                        resizeMode="contain"
                        shouldPlay={isPlaying}
                        isLooping
                        onPlaybackStatusUpdate={(status) => setIsPlaying(status.isPlaying)}
                    />
                ) : (
                    <Text className="text-white">Loading video...</Text>
                )}
            </View>
            <View className="flex-row justify-center items-center p-4">
                <TouchableOpacity
                    onPress={handlePlayPause}
                    className="bg-white rounded-full p-4 mr-4"
                >
                    <Text className="text-black font-bold">
                        {isPlaying ? 'Pause' : 'Play'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-white rounded-full p-4"
                >
                    <Text className="text-black font-bold">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
