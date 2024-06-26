import axios from "axios";
import { YOUTUBE_VIDEO_API, BASE_URL, YOUTUBE_API_KEY } from "./Constant";
import { useLayoutEffect, useState } from "react";

export const getYoutubeData = async () => {
    try {
        const videos = await axios.get(YOUTUBE_VIDEO_API);
        return videos;
    } catch (error) {
        console.error(error);
    }
};

export const getVideoInfo = async (id) => {
    const GET_VIDEO_INFO = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${YOUTUBE_API_KEY}`; 
    try {
        const data = await axios.get(GET_VIDEO_INFO);
        return data;
    } catch (error) {
        console.error();
    }
};

export const getChannelInfo = async (id) => {
    const GET_CHANNEL_INFO = `${BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&maxResults=50&key=${YOUTUBE_API_KEY}`;
    const GET_BANNER_INFO = `${BASE_URL}/channels?part=brandingSettings&id=${id}&key=${YOUTUBE_API_KEY}`;

    try {
        const channelData = await axios.get(GET_CHANNEL_INFO);
        const channelBannerData = await axios.get(GET_BANNER_INFO);
        return {channelData, channelBannerData};
    } catch (error) {
        console.error(error);
    }
};

export const getPlayLists = async (id, nextPgToken) => {
    const PLAYLISTS = `${BASE_URL}/playlists?part=snippet%2CcontentDetails&channelId=${id}&maxResults=25&key=${YOUTUBE_API_KEY}`;
    try {
        const playlists = await axios.get(PLAYLISTS);
        return playlists;
    } catch (error) {
        console.error(error);
    }
};

export const getRecommendedVideos = async (channelID) => {
    const RECOMMENDED_VIDEOS = `${BASE_URL}/activities?part=snippet%2CcontentDetails&channelId=${channelID}&maxResults=20&key=${YOUTUBE_API_KEY}`;

    try {
        const recommendedVideos = await axios.get(RECOMMENDED_VIDEOS);
        return recommendedVideos;
    } catch (error) {
        console.error(error);
    }
};

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
  
    useLayoutEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
};

export const getViews = async (videoID) => {
    const VIEWS = `${BASE_URL}/videos?part=statistics&id=${videoID}&key=${YOUTUBE_API_KEY}`;

    try {
        const videoViews = await axios.get(VIEWS);
        return videoViews?.data?.items[0]?.statistics?.viewCount
    } catch (error) {
        console.error('error', error);
        return 0
    }
};

export const getSearchResults = async (query) => {
    const SEARCH_URL = `${BASE_URL}/search?part=snippet&maxResults=20&q=${query}&type=video&key=${YOUTUBE_API_KEY}`;

    try {
        const results = await axios.get(SEARCH_URL);
        return results;
    } catch (error) {
        console.error(error);
    }
};

export const getComments = async (vdoID) => {
    const COMMENT_THREAD_URL = `${BASE_URL}/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${YOUTUBE_API_KEY}&videoId=${vdoID}`;

    const COMMENT_URL = `${BASE_URL}/comments?part=snippet&id=${vdoID}&maxResults=50&textFormat=plainText&key=${YOUTUBE_API_KEY}`

    try {
        const commentThreadResults = await axios.get(COMMENT_THREAD_URL);
        return commentThreadResults;
    } catch (error) {
        console.error(error);
    }
};
