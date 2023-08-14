// complete and use this to avoid any duplication of endpoints
export const BASE_URL = 'http://localhost:3000'

export const endpoints = {
    login: "/login",
    signup: "/signup",
    logout: "/logout",
    createProfile: "/profiles/create_profile",
    getProfile: (id) => `/profile/${id}`,
    createPost: "/create",
    updatePost: "/update",
    getPost: "/article", // also used for fetching drafts
    getAllPosts: "/articles",
    deletePost: '/delete',
    likePost: "/like",
    getAllDrafts: "/drafts",
    getRevisionDraft: "/revisions",
    getPostsByTopic: "/by_topic",
    searchPosts: (query) => encodeURI(`/search?query=${query}`),
    getAllLists: "/playlists",
    getListPosts: (id) => `/playlists/${id}`,
    addList: "/playlists",
    addPostToList: "/playlists/add_article",
    topPosts: "/top_posts",
    recommendedPosts: "/recommendedPosts",
    currentUser: '/current_user'
};
