import axios from 'axios';

const API_URL = 'https://arc-backend-rosy.vercel.app/api/property';

// Create a new property
export const createProperty = async (propertyData) => {
  const formData = new FormData();
  
  // Append all property data
  Object.keys(propertyData).forEach(key => {
    if (key === 'images' || key === 'videos') return;
    formData.append(key, propertyData[key]);
  });

  // Append images
  if (propertyData.images) {
    propertyData.images.forEach(image => {
      formData.append('images', image);
    });
  }

  // Append videos
  if (propertyData.videos) {
    propertyData.videos.forEach(video => {
      formData.append('videos', video);
    });
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get all properties
export const getProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single property
export const getProperty = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update property
export const updateProperty = async (id, propertyData) => {
  const formData = new FormData();
  
  Object.keys(propertyData).forEach(key => {
    if (key === 'images' || key === 'videos') return;
    formData.append(key, propertyData[key]);
  });

  if (propertyData.images) {
    propertyData.images.forEach(image => {
      formData.append('images', image);
    });
  }

  if (propertyData.videos) {
    propertyData.videos.forEach(video => {
      formData.append('videos', video);
    });
  }

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete property
export const deleteProperty = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Delete property image
export const deletePropertyImage = async (propertyId, imageId) => {
  const response = await axios.delete(`${API_URL}/${propertyId}/images/${imageId}`);
  return response.data;
};

// Delete property video
export const deletePropertyVideo = async (propertyId, videoId) => {
  const response = await axios.delete(`${API_URL}/${propertyId}/videos/${videoId}`);
  return response.data;
};