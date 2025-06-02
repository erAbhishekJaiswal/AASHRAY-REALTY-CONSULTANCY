// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDropzone } from 'react-dropzone';
// import {
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Grid,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   CircularProgress,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { createProperty, getProperty, updateProperty, deletePropertyImage, deletePropertyVideo } from '../services/api';

// const PropertyForm = ({ isEdit = false }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     price: '',
//     type: 'sale',
//     location: {
//       address: '',
//       coordinates: [0, 0],
//     },
//     bedrooms: '',
//     area: '',
//     images: [],
//     videos: [],
//     status: 'active',
//   });

//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [videoPreviews, setVideoPreviews] = useState([]);

//   useEffect(() => {
//     if (isEdit && id) {
//       const fetchProperty = async () => {
//         try {
//           setLoading(true);
//           const response = await getProperty(id);
//           setProperty(response.data);
//           setImagePreviews(response.data.images.map(img => img.url));
//           setVideoPreviews(response.data.videos.map(vid => vid.url));
//         } catch (error) {
//           console.error('Error fetching property:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, isEdit]);

//   // Corrected image dropzone with proper MIME types
//   const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
//     accept: {
//       'image/jpeg': ['.jpeg', '.jpg'],
//       'image/png': ['.png'],
//       'image/gif': ['.gif'],
//       'image/webp': ['.webp']
//     },
//     maxFiles: 10,
//     onDrop: acceptedFiles => {
//       setProperty(prev => ({
//         ...prev,
//         images: [...prev.images, ...acceptedFiles],
//       }));
//       acceptedFiles.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setImagePreviews(prev => [...prev, reader.result]);
//         };
//         reader.readAsDataURL(file);
//       });
//     },
//   });

//   // Corrected video dropzone with proper MIME types
//   const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
//     accept: {
//       'video/mp4': ['.mp4'],
//       'video/quicktime': ['.mov'],
//       'video/x-msvideo': ['.avi'],
//       'video/webm': ['.webm']
//     },
//     maxFiles: 3,
//     onDrop: acceptedFiles => {
//       setProperty(prev => ({
//         ...prev,
//         videos: [...prev.videos, ...acceptedFiles],
//       }));
//       acceptedFiles.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setVideoPreviews(prev => [...prev, reader.result]);
//         };
//         reader.readAsDataURL(file);
//       });
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('location.')) {
//       const locationField = name.split('.')[1];
//       setProperty(prev => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           [locationField]: value,
//         },
//       }));
//     } else {
//       setProperty(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = [...property.images];
//     const newPreviews = [...imagePreviews];
    
//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setProperty(prev => ({ ...prev, images: newImages }));
//     setImagePreviews(newPreviews);
//   };

//   const handleRemoveVideo = (index) => {
//     const newVideos = [...property.videos];
//     const newPreviews = [...videoPreviews];
    
//     newVideos.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setProperty(prev => ({ ...prev, videos: newVideos }));
//     setVideoPreviews(newPreviews);
//   };

//   const handleRemoveExistingImage = async (imageId) => {
//     try {
//       await deletePropertyImage(id, imageId);
//       setProperty(prev => ({
//         ...prev,
//         images: prev.images.filter(img => img.public_id !== imageId),
//       }));
//       setImagePreviews(prev => prev.filter((_, i) => 
//         property.images[i].public_id !== imageId
//       ));
//     } catch (error) {
//       console.error('Error deleting image:', error);
//     }
//   };

//   const handleRemoveExistingVideo = async (videoId) => {
//     try {
//       await deletePropertyVideo(id, videoId);
//       setProperty(prev => ({
//         ...prev,
//         videos: prev.videos.filter(vid => vid.public_id !== videoId),
//       }));
//       setVideoPreviews(prev => prev.filter((_, i) => 
//         property.videos[i].public_id !== videoId
//       ));
//     } catch (error) {
//       console.error('Error deleting video:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (isEdit) {
//         await updateProperty(id, property);
//       } else {
//         await createProperty(property);
//       }
//       navigate('/');
//     } catch (error) {
//       console.error('Error submitting property:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && isEdit) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Paper elevation={3} sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {isEdit ? 'Edit Property' : 'Add New Property'}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           {/* Form fields remain the same as before */}
//           {/* ... */}
          
//           {/* Image Upload Section */}
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Images
//             </Typography>
//             <Box
//               {...getImageRootProps()}
//               sx={{
//                 border: '1px dashed gray',
//                 padding: 3,
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 mb: 2,
//               }}
//             >
//               <input {...getImageInputProps()} />
//               <Typography>
//                 Drag 'n' drop some images here, or click to select files
//               </Typography>
//               <Typography variant="caption">
//                 (Max 10 images, up to 50MB each)
//               </Typography>
//             </Box>
            
//             {/* Image Previews */}
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {property.images?.map((image, index) => (
//                 <Box key={index} position="relative">
//                   <img
//                     src={imagePreviews[index]}
//                     alt={`Preview ${index}`}
//                     style={{ width: 100, height: 100, objectFit: 'cover' }}
//                   />
//                   <IconButton
//                     size="small"
//                     sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                     onClick={() => handleRemoveImage(index)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
              
//               {/* Existing Images */}
//               {isEdit && property.images?.map((image, index) => (
//                 <Box key={image.public_id} position="relative">
//                   <img
//                     src={image.url}
//                     alt={`Existing ${index}`}
//                     style={{ width: 100, height: 100, objectFit: 'cover' }}
//                   />
//                   <IconButton
//                     size="small"
//                     sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                     onClick={() => handleRemoveExistingImage(image.public_id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
          
//           {/* Video Upload Section */}
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Videos
//             </Typography>
//             <Box
//               {...getVideoRootProps()}
//               sx={{
//                 border: '1px dashed gray',
//                 padding: 3,
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 mb: 2,
//               }}
//             >
//               <input {...getVideoInputProps()} />
//               <Typography>
//                 Drag 'n' drop some videos here, or click to select files
//               </Typography>
//               <Typography variant="caption">
//                 (Max 3 videos, up to 50MB each)
//               </Typography>
//             </Box>
            
//             {/* Video Previews */}
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {property.videos?.map((video, index) => (
//                 <Box key={index} position="relative">
//                   <video
//                     src={videoPreviews[index]}
//                     style={{ width: 150, height: 100 }}
//                     controls
//                   />
//                   <IconButton
//                     size="small"
//                     sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                     onClick={() => handleRemoveVideo(index)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
              
//               {/* Existing Videos */}
//               {isEdit && property.videos?.map((video, index) => (
//                 <Box key={video.public_id} position="relative">
//                   <video
//                     src={video.url}
//                     style={{ width: 150, height: 100 }}
//                     controls
//                   />
//                   <IconButton
//                     size="small"
//                     sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                     onClick={() => handleRemoveExistingVideo(video.public_id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
          
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : isEdit ? 'Update Property' : 'Add Property'}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default PropertyForm;









import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { createProperty, getProperty, updateProperty, deletePropertyImage, deletePropertyVideo } from '../services/api';
import "../cssFiles/PropertyForm.css";

const PropertyForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    type: 'sale',
    location: { address: '', coordinates: [0, 0] },
    bedrooms: '',
    area: '',
    images: [],
    videos: [],
    status: 'active',
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  useEffect(() => {
    if (isEdit && id) {
      const fetchProperty = async () => {
        setLoading(true);
        try {
          const response = await getProperty(id);
          setProperty(response.data);
          setImagePreviews(response.data.images.map(img => img.url));
          setVideoPreviews(response.data.videos.map(vid => vid.url));
        } catch (err) {
          console.error('Fetch error:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id, isEdit]);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 10,
    onDrop: files => {
      setProperty(prev => ({ ...prev, images: [...prev.images, ...files] }));
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => setImagePreviews(prev => [...prev, reader.result]);
        reader.readAsDataURL(file);
      });
    }
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    accept: { 'video/*': [] },
    maxFiles: 3,
    onDrop: files => {
      setProperty(prev => ({ ...prev, videos: [...prev.videos, ...files] }));
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => setVideoPreviews(prev => [...prev, reader.result]);
        reader.readAsDataURL(file);
      });
    }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setProperty(prev => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setProperty(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = idx => {
    const newImages = [...property.images];
    const newPreviews = [...imagePreviews];
    newImages.splice(idx, 1);
    newPreviews.splice(idx, 1);
    setProperty(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleRemoveVideo = idx => {
    const newVideos = [...property.videos];
    const newPreviews = [...videoPreviews];
    newVideos.splice(idx, 1);
    newPreviews.splice(idx, 1);
    setProperty(prev => ({ ...prev, videos: newVideos }));
    setVideoPreviews(newPreviews);
  };

  const handleRemoveExistingImage = async (imgId) => {
    try {
      await deletePropertyImage(id, imgId);
      setProperty(prev => ({
        ...prev,
        images: prev.images.filter(img => img.public_id !== imgId),
      }));
      setImagePreviews(prev => prev.filter((_, i) => property.images[i].public_id !== imgId));
    } catch (err) {
      console.error('Delete image error:', err);
    }
  };

  const handleRemoveExistingVideo = async (vidId) => {
    try {
      await deletePropertyVideo(id, vidId);
      setProperty(prev => ({
        ...prev,
        videos: prev.videos.filter(vid => vid.public_id !== vidId),
      }));
      setVideoPreviews(prev => prev.filter((_, i) => property.videos[i].public_id !== vidId));
    } catch (err) {
      console.error('Delete video error:', err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) await updateProperty(id, property);
      else await createProperty(property);
      navigate('/properties');
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <div className="loading">Loading...</div>;

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="title" value={property?.title} onChange={handleChange} required />
        </label>

        <label>Description:
          <textarea name="description" value={property?.description} onChange={handleChange} required />
        </label>

        <label>Price:
          <input type="number" name="price" value={property?.price} onChange={handleChange} required />
        </label>

        <label>Type:
          <select name="type" value={property?.type} onChange={handleChange}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </label>

        <label>Address:
          <input type="text" name="location.address" value={property?.location?.address} onChange={handleChange} />
        </label>

        <label>Bedrooms:
          <input type="number" name="bedrooms" value={property?.bedrooms} onChange={handleChange} />
        </label>

        <label>Area (sq ft):
          <input type="number" name="area" value={property?.area} onChange={handleChange} />
        </label>

        {/* Image Upload */}
        <div {...getImageRootProps()} className="dropzone">
          <input {...getImageInputProps()} />
          <p>Drag & drop images here, or click to select</p>
        </div>
        <div className="preview-container">
          {!isEdit && imagePreviews?.map((src, idx) => (
            <div key={idx} className="preview">
              <img src={src} alt="preview" />
              <button type="button" onClick={() => handleRemoveImage(idx)}>X</button>
            </div>
          ))}
          {isEdit && property?.images?.map((img, idx) => (
            <div key={img?.public_id} className="preview">
              <img src={img?.url} alt="existing" />
              <button type="button" onClick={() => handleRemoveExistingImage(img.public_id)}>X</button>
            </div>
          ))}
        </div>

        {/* Video Upload */}
        <div {...getVideoRootProps()} className="dropzone">
          <input {...getVideoInputProps()} />
          <p>Drag & drop videos here, or click to select</p>
        </div>
        <div className="preview-container">
          {videoPreviews?.map((src, idx) => (
            <div key={idx} className="preview">
              <video src={src} controls width="150" />
              <button type="button" onClick={() => handleRemoveVideo(idx)}>X</button>
            </div>
          ))}
          {isEdit && property?.videos?.map((vid, idx) => (
            <div key={vid.public_id} className="preview">
              <video src={vid.url} controls width="150" />
              <button type="button" onClick={() => handleRemoveExistingVideo(vid.public_id)}>X</button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update Property' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;











// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDropzone } from 'react-dropzone';
// import { createProperty, getProperty, updateProperty, deletePropertyImage, deletePropertyVideo } from '../services/api';
// import "../cssFiles/PropertyForm.css";

// const PropertyForm = ({ isEdit = false }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     price: '',
//     type: 'sale',
//     location: { 
//       address: '', 
//       coordinates: [0, 0] 
//     },
//     bedrooms: '',
//     area: '',
//     photos: [],
//     images: [],
//     videos: [],
//     status: 'active',
//     rejectionReason: '',
//     seller: null, // This would typically be set from logged in user
//   });

//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [videoPreviews, setVideoPreviews] = useState([]);
//   const [photoPreviews, setPhotoPreviews] = useState([]);

//   useEffect(() => {
//     if (isEdit && id) {
//       const fetchProperty = async () => {
//         setLoading(true);
//         try {
//           const response = await getProperty(id);
//           setProperty(response.data);
//           setImagePreviews(response.data.images.map(img => img.url));
//           setVideoPreviews(response.data.videos.map(vid => vid.url));
//           setPhotoPreviews(response.data.photos.map(photo => photo.url));
//         } catch (err) {
//           console.error('Fetch error:', err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, isEdit]);

//   // Dropzone for photos
//   const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } = useDropzone({
//     accept: { 'image/*': [] },
//     maxFiles: 10,
//     onDrop: files => {
//       setProperty(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
//       files.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = () => setPhotoPreviews(prev => [...prev, reader.result]);
//         reader.readAsDataURL(file);
//       });
//     }
//   });

//   // Dropzone for images
//   const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
//     accept: { 'image/*': [] },
//     maxFiles: 10,
//     onDrop: files => {
//       setProperty(prev => ({ ...prev, images: [...prev.images, ...files] }));
//       files.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = () => setImagePreviews(prev => [...prev, reader.result]);
//         reader.readAsDataURL(file);
//       });
//     }
//   });

//   // Dropzone for videos
//   const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
//     accept: { 'video/*': [] },
//     maxFiles: 3,
//     onDrop: files => {
//       setProperty(prev => ({ ...prev, videos: [...prev.videos, ...files] }));
//       files.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = () => setVideoPreviews(prev => [...prev, reader.result]);
//         reader.readAsDataURL(file);
//       });
//     }
//   });

//   const handleChange = e => {
//     const { name, value } = e.target;
//     if (name.startsWith('location.')) {
//       const field = name.split('.')[1];
//       setProperty(prev => ({
//         ...prev,
//         location: { ...prev.location, [field]: value },
//       }));
//     } else if (name === 'coordinates') {
//       // Handle coordinates input (expecting "longitude,latitude" format)
//       const [longitude, latitude] = value.split(',').map(Number);
//       setProperty(prev => ({
//         ...prev,
//         location: { 
//           ...prev.location, 
//           coordinates: [longitude || 0, latitude || 0] 
//         },
//       }));
//     } else {
//       setProperty(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleRemovePhoto = idx => {
//     const newPhotos = [...property.photos];
//     const newPreviews = [...photoPreviews];
//     newPhotos.splice(idx, 1);
//     newPreviews.splice(idx, 1);
//     setProperty(prev => ({ ...prev, photos: newPhotos }));
//     setPhotoPreviews(newPreviews);
//   };

//   const handleRemoveImage = idx => {
//     const newImages = [...property.images];
//     const newPreviews = [...imagePreviews];
//     newImages.splice(idx, 1);
//     newPreviews.splice(idx, 1);
//     setProperty(prev => ({ ...prev, images: newImages }));
//     setImagePreviews(newPreviews);
//   };

//   const handleRemoveVideo = idx => {
//     const newVideos = [...property.videos];
//     const newPreviews = [...videoPreviews];
//     newVideos.splice(idx, 1);
//     newPreviews.splice(idx, 1);
//     setProperty(prev => ({ ...prev, videos: newVideos }));
//     setVideoPreviews(newPreviews);
//   };

//   const handleRemoveExistingPhoto = async (photoId) => {
//     try {
//       await deletePropertyImage(id, photoId);
//       setProperty(prev => ({
//         ...prev,
//         photos: prev.photos.filter(photo => photo.public_id !== photoId),
//       }));
//       setPhotoPreviews(prev => prev.filter((_, i) => property.photos[i].public_id !== photoId));
//     } catch (err) {
//       console.error('Delete photo error:', err);
//     }
//   };

//   const handleRemoveExistingImage = async (imgId) => {
//     try {
//       await deletePropertyImage(id, imgId);
//       setProperty(prev => ({
//         ...prev,
//         images: prev.images.filter(img => img.public_id !== imgId),
//       }));
//       setImagePreviews(prev => prev.filter((_, i) => property.images[i].public_id !== imgId));
//     } catch (err) {
//       console.error('Delete image error:', err);
//     }
//   };

//   const handleRemoveExistingVideo = async (vidId) => {
//     try {
//       await deletePropertyVideo(id, vidId);
//       setProperty(prev => ({
//         ...prev,
//         videos: prev.videos.filter(vid => vid.public_id !== vidId),
//       }));
//       setVideoPreviews(prev => prev.filter((_, i) => property.videos[i].public_id !== vidId));
//     } catch (err) {
//       console.error('Delete video error:', err);
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isEdit) await updateProperty(id, property);
//       else await createProperty(property);
//       navigate('/');
//     } catch (err) {
//       console.error('Submit error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && isEdit) return <div className="loading">Loading...</div>;

//   return (
//     <div className="form-container">
//       <h2>{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Title:
//           <input type="text" name="title" value={property?.title} onChange={handleChange} required />
//         </label>

//         <label>Description:
//           <textarea name="description" value={property?.description} onChange={handleChange} required />
//         </label>

//         <label>Price:
//           <input type="number" name="price" value={property?.price} onChange={handleChange} required />
//         </label>

//         <label>Type:
//           <select name="type" value={property?.type} onChange={handleChange}>
//             <option value="sale">Sale</option>
//             <option value="rent">Rent</option>
//           </select>
//         </label>

//         <label>Address:
//           <input type="text" name="location.address" value={property?.location?.address} onChange={handleChange} />
//         </label>

//         <label>Coordinates (longitude,latitude):
//           <input 
//             type="text" 
//             name="coordinates" 
//             value={property?.location?.coordinates?.join(',')} 
//             onChange={handleChange} 
//             placeholder="e.g., -73.935242,40.730610"
//           />
//         </label>

//         <label>Bedrooms:
//           <input type="number" name="bedrooms" value={property?.bedrooms} onChange={handleChange} />
//         </label>

//         <label>Area (sq ft):
//           <input type="number" name="area" value={property?.area} onChange={handleChange} required />
//         </label>

//         <label>Status:
//           <select name="status" value={property?.status} onChange={handleChange}>
//             <option value="active">Active</option>
//             <option value="verified">Verified</option>
//             <option value="Unverified">Unverified</option>
//           </select>
//         </label>

//         {property?.status === 'Unverified' && (
//           <label>Rejection Reason:
//             <textarea 
//               name="rejectionReason" 
//               value={property?.rejectionReason} 
//               onChange={handleChange} 
//               disabled={!isEdit} // Typically only editable by admin
//             />
//           </label>
//         )}

//         {/* Photos Upload */}
//         <div {...getPhotoRootProps()} className="dropzone">
//           <input {...getPhotoInputProps()} />
//           <p>Drag & drop photos here, or click to select</p>
//         </div>
//         <div className="preview-container">
//           {!isEdit && photoPreviews?.map((src, idx) => (
//             <div key={idx} className="preview">
//               <img src={src} alt="preview" />
//               <button type="button" onClick={() => handleRemovePhoto(idx)}>X</button>
//             </div>
//           ))}
//           {isEdit && property?.photos?.map((photo, idx) => (
//             <div key={photo?.public_id} className="preview">
//               <img src={photo?.url} alt="existing" />
//               <button type="button" onClick={() => handleRemoveExistingPhoto(photo.public_id)}>X</button>
//             </div>
//           ))}
//         </div>

//         {/* Images Upload */}
//         <div {...getImageRootProps()} className="dropzone">
//           <input {...getImageInputProps()} />
//           <p>Drag & drop images here, or click to select</p>
//         </div>
//         <div className="preview-container">
//           {!isEdit && imagePreviews?.map((src, idx) => (
//             <div key={idx} className="preview">
//               <img src={src} alt="preview" />
//               <button type="button" onClick={() => handleRemoveImage(idx)}>X</button>
//             </div>
//           ))}
//           {isEdit && property?.images?.map((img, idx) => (
//             <div key={img?.public_id} className="preview">
//               <img src={img?.url} alt="existing" />
//               <button type="button" onClick={() => handleRemoveExistingImage(img.public_id)}>X</button>
//             </div>
//           ))}
//         </div>

//         {/* Videos Upload */}
//         <div {...getVideoRootProps()} className="dropzone">
//           <input {...getVideoInputProps()} />
//           <p>Drag & drop videos here, or click to select</p>
//         </div>
//         <div className="preview-container">
//           {videoPreviews?.map((src, idx) => (
//             <div key={idx} className="preview">
//               <video src={src} controls width="150" />
//               <button type="button" onClick={() => handleRemoveVideo(idx)}>X</button>
//             </div>
//           ))}
//           {isEdit && property?.videos?.map((vid, idx) => (
//             <div key={vid.public_id} className="preview">
//               <video src={vid.url} controls width="150" />
//               <button type="button" onClick={() => handleRemoveExistingVideo(vid.public_id)}>X</button>
//             </div>
//           ))}
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Saving...' : isEdit ? 'Update Property' : 'Add Property'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PropertyForm;