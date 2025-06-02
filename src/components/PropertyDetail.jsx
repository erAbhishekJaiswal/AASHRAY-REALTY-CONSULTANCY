// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Paper,
//   Chip,
//   IconButton,
//   Divider,
//   CircularProgress,
//   Container
// } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import { getProperty, deleteProperty } from '../services/api';

// const PropertyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);
//         const response = await getProperty(id);
//         setProperty(response.data);
//       } catch (error) {
//         console.error('Error fetching property:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       await deleteProperty(id);
//       navigate('/');
//     } catch (error) {
//       console.error('Error deleting property:', error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!property) {
//     return (
//       <Typography variant="h6" align="center" sx={{ mt: 4 }}>
//         Property not found
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">{property.title}</Typography>
//         <Box>
//           <IconButton
//             color="primary"
//             onClick={() => navigate(`/properties/edit/${property._id}`)}
//           >
//             <Edit />
//           </IconButton>
//           <IconButton
//             color="error"
//             onClick={handleDelete}
//             disabled={deleting}
//           >
//             {deleting ? <CircularProgress size={24} /> : <Delete />}
//           </IconButton>
//         </Box>
//       </Box>

//       <Chip
//         label={property.type === 'sale' ? 'For Sale' : 'For Rent'}
//         color={property.type === 'sale' ? 'primary' : 'secondary'}
//         sx={{ mb: 2 }}
//       />

//       <Typography variant="h6" color="text.secondary" gutterBottom>
//         {property.location.address}
//       </Typography>

//       <Typography variant="h5" sx={{ mb: 2 }}>
//         ${property.price.toLocaleString()}
//       </Typography>

//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={6} sm={3}>
//           <Typography variant="body1">
//             <strong>Bedrooms:</strong> {property.bedrooms}
//           </Typography>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Typography variant="body1">
//             <strong>Area:</strong> {property.area} sq ft
//           </Typography>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Typography variant="body1">
//             <strong>Status:</strong> {property.status}
//           </Typography>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       <Typography variant="h6" gutterBottom>
//         Description
//       </Typography>
//       <Typography paragraph sx={{ mb: 3 }}>
//         {property.description}
//       </Typography>

//       <Typography variant="h6" gutterBottom>
//         Images
//       </Typography>
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {property.images.map((image, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Paper elevation={3}>
//               <img
//                 src={image.url}
//                 alt={`Property ${index + 1}`}
//                 style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//               />
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {property.videos.length > 0 && (
//         <>
//           <Typography variant="h6" gutterBottom>
//             Videos
//           </Typography>
//           <Grid container spacing={2}>
//             {property.videos.map((video, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <Paper elevation={3}>
//                   <video
//                     src={video.url}
//                     style={{ width: '100%', height: 'auto' }}
//                     controls
//                   />
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       )}
//     </Container>
//   );
// };

// export default PropertyDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getProperty, deleteProperty } from '../services/api';
// import '../cssFiles/PropertyDetail.css';

// const PropertyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);
//         const response = await getProperty(id);
//         setProperty(response.data);
//       } catch (error) {
//         console.error('Error fetching property:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       await deleteProperty(id);
//       navigate('/');
//     } catch (error) {
//       console.error('Error deleting property:', error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (loading) {
//     return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
//   }

//   if (!property) {
//     return <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Property not found</h3>;
//   }

//   return (
//     <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h2>{property.title}</h2>
//         <div>
//           <button onClick={() => navigate(`/properties/edit/${property._id}`)}>Edit</button>
//           <button onClick={handleDelete} disabled={deleting} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
//             {deleting ? 'Deleting...' : 'Delete'}
//           </button>
//         </div>
//       </div>

//       <span
//         style={{
//           display: 'inline-block',
//           padding: '5px 10px',
//           backgroundColor: property.type === 'sale' ? '#007bff' : '#6c757d',
//           color: '#fff',
//           borderRadius: '5px',
//           marginBottom: '10px'
//         }}
//       >
//         {property.type === 'sale' ? 'For Sale' : 'For Rent'}
//       </span>

//       <p style={{ color: '#666' }}>{property.location?.address}</p>
//       <h3>${property.price.toLocaleString()}</h3>

//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
//         <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
//         <p><strong>Area:</strong> {property.area} sq ft</p>
//         <p><strong>Status:</strong> {property.status}</p>
//       </div>

//       <hr />

//       <h3>Description</h3>
//       <p>{property.description}</p>

//       <h3>Images</h3>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
//         {property.images.map((img, index) => (
//           <div key={index} style={{ flex: '1 1 30%' }}>
//             <img
//               src={img.url}
//               alt={`Property ${index + 1}`}
//               style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
//             />
//           </div>
//         ))}
//       </div>

//       {property.videos.length > 0 && (
//         <>
//           <h3>Videos</h3>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//             {property.videos.map((video, index) => (
//               <div key={index} style={{ flex: '1 1 45%' }}>
//                 <video
//                   src={video.url}
//                   style={{ width: '100%' }}
//                   controls
//                 />
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PropertyDetail;







// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getProperty, deleteProperty } from "../services/api";
// import "../cssFiles/PropertyDetail.css";

// const PropertyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);
//         const response = await getProperty(id);
//         setProperty(response.data);
//       } catch (error) {
//         console.error("Error fetching property:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this property?");
//     if (confirmDelete) {
//       try {
//         setDeleting(true);
//         await deleteProperty(id);
//         navigate("/");
//       } catch (error) {
//         console.error("Error deleting property:", error);
//       } finally {
//         setDeleting(false);
//       }
//     }
//   };

//   const handleNextImage = () => {
//     setActiveImageIndex((prev) => 
//       prev === property.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handlePrevImage = () => {
//     setActiveImageIndex((prev) => 
//       prev === 0 ? property.images.length - 1 : prev - 1
//     );
//   };

//   if (loading) {
//     return <div className="loading-state">Loading...</div>;
//   }

//   if (!property) {
//     return <div className="error-state">Property not found</div>;
//   }

//   return (
//     <div className="property-detail-container">
//       <div className="property-card-header">
//         <div className="property-agency-info">
//           <h1>AASHRAY REALTY CONSULTANCY</h1>
//           <p className="property-tagline">From Your Dream to Your Home</p>
//         </div>
//         <div className="property-codes">
//           <p>
//             Property Code: <span>ANGGKSSF001</span>
//           </p>
//           <p>
//             Ad Date: <span>{new Date(property.createdAt).toLocaleDateString()}</span>
//           </p>
//         </div>
//       </div>

//       <div className="property-detail">
//         <div className="property-header">
//           <div>
//             <h1 className="property-title">{property.title}</h1>
//             <p className="property-meta">
//               <i className="fas fa-map-marker-alt"></i> {property.location?.address}
//             </p>
//           </div>
//           <div className="property-actions">
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate(`/properties/edit/${property._id}`)}
//             >
//               <i className="fas fa-edit"></i> Edit
//             </button>
//             <button
//               className="btn btn-danger"
//               onClick={handleDelete}
//               disabled={deleting}
//             >
//               {deleting ? (
//                 <i className="fas fa-spinner fa-spin"></i>
//               ) : (
//                 <i className="fas fa-trash"></i>
//               )}
//               {deleting ? " Deleting..." : " Delete"}
//             </button>
//           </div>
//         </div>

//         <div className="property-image-description">
//           <div className="property-media-section">
//             <div className="main-image-container">
//               {property.images.length > 0 && (
//                 <>
//                   <img 
//                     src={property.images[activeImageIndex].url} 
//                     alt={`Property ${activeImageIndex + 1}`} 
//                     className="main-image"
//                   />
//                   {property.images.length > 1 && (
//                     <>
//                       <button 
//                         className="image-nav-button prev-button"
//                         onClick={handlePrevImage}
//                       >
//                         <i className="fas fa-chevron-left"></i>
//                       </button>
//                       <button 
//                         className="image-nav-button next-button"
//                         onClick={handleNextImage}
//                       >
//                         <i className="fas fa-chevron-right"></i>
//                       </button>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
            
//             <div className="image-thumbnails">
//               {property.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img.url}
//                   alt={`Thumbnail ${index + 1}`}
//                   className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
//                   onClick={() => setActiveImageIndex(index)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="property-info-section">
//             <div className="property-basic-info">
//               <div className="property-type-price">
//                 <span className={`property-badge ${property.type}`}>
//                   {property.type === "sale" ? "For Sale" : "For Rent"}
//                 </span>
//                 <div className="property-price">
//                   ₹{property.price.toLocaleString()}
//                 </div>
//               </div>

//               <div className="property-features">
//                 <div className="feature-item">
//                   <i className="fas fa-bed"></i>
//                   <span>{property.bedrooms} Bedrooms</span>
//                 </div>
//                 <div className="feature-item">
//                   <i className="fas fa-ruler-combined"></i>
//                   <span>{property.area} sq ft</span>
//                 </div>
//                 <div className="feature-item">
//                   <i className="fas fa-info-circle"></i>
//                   <span>Status: {property.status}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="property-description">
//               <h3 className="description-label">
//                 <i className="fas fa-align-left"></i> Description
//               </h3>
//               <p className="property-description-paragraph">
//                 {property.description}
//               </p>
//             </div>

//             <div className="property-contact-card">
//               <div className="contact-agent-info">
//                 <div className="agent-avatar">
//                   <i className="fas fa-user-tie"></i>
//                 </div>
//                 <div className="agent-details">
//                   <h4>Contact Agent</h4>
//                   <p>GYAAT</p>
//                   <small>Let's find solutions</small>
//                 </div>
//               </div>
//               <button className="contact-button">
//                 <i className="fas fa-envelope"></i> Enquire Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {property.images.length > 1 && (
//           <div className="media-gallery">
//             <h3>
//               <i className="fas fa-images"></i> Property Images
//             </h3>
//             <div className="images-grid">
//               {property.images.map((img, index) => (
//                 <div key={index} className="image-item">
//                   <img src={img.url} alt={`Property ${index + 1}`} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {property.videos.length > 0 && (
//           <div className="media-gallery">
//             <h3>
//               <i className="fas fa-video"></i> Property Videos
//             </h3>
//             <div className="videos-grid">
//               {property.videos.map((video, index) => (
//                 <div key={index} className="video-item">
//                   <video src={video.url} controls />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyDetail;












// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getProperty, deleteProperty } from "../services/api";
// import "../cssFiles/PropertyDetail.css";

// const PropertyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         setLoading(true);
//         const response = await getProperty(id);
//         setProperty(response.data);
//       } catch (error) {
//         console.error("Error fetching property:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       await deleteProperty(id);
//       navigate("/");
//     } catch (error) {
//       console.error("Error deleting property:", error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (loading) {
//     return <div className="loading-state">Loading...</div>;
//   }

//   if (!property) {
//     return <div className="error-state">Property not found</div>;
//   }

//   return (
//     <div className="property-detail-container">
//       <div className="property-card-header">
//         <div className="property-agency-info">
//           <h1>AASHRAY REALTY CONSULTANCY</h1>
//           <p className="property-tagline">From Your Dream to Your Home</p>
//         </div>
//         <div className="property-codes">
//           <p>
//             Property Code: <span>ANGGKSSF001</span>
//           </p>
//           <p>
//             Ad Date: <span>09/04/2025</span>
//           </p>
//         </div>
//       </div>
//       <div className="property-detail">
//         <div className="property-header">
//           <h1 className="property-title">Property Details</h1>
//           <div className="property-actions">
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate(`/properties/edit/${property._id}`)}
//             >
//               Edit
//             </button>
//             <button
//               className="btn btn-danger"
//               onClick={handleDelete}
//               disabled={deleting}
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </button>
//           </div>
//         </div>

//         <div className="property-image-description">
//           <div className="profile-media-gallery">
//             <div className="profile-images-grid">
//               {property.images[0] && (
//                 <div className="profile-image-item">
//                   <img src={property.images[0].url} alt="Property 1" />
//                 </div>
//               )}
              
//             </div>
//           </div>
//           <div className="property-description">
//             <h3>{property.title}</h3>
//             <div className="property-description">
//               <div className="description-label">Description</div>
//               <p className="property-description-paragraph">{property.description}</p>
//             </div>

//             Type:<span
//               className={`property-badge ${
//                 property.type === "sale" ? "sale" : "rent"
//               }`}
//             >
//               {property.type === "sale" ? "For Sale" : "For Rent"}
//             </span>

//             <p className="property-meta">{property.location?.address}</p>

//             <div className="property-features">
//               <p>
//                 <strong>Bedrooms:</strong> {property.bedrooms}
//               </p>
//               <p>
//                 <strong>Area:</strong> {property.area} sq ft
//               </p>
//               <p>
//                 <strong>Status:</strong> {property.status}
//               </p>
//             </div>
//              <div className="propertydetail-card-footer">
//             <div className="propertydetail-price-section">
//               <p className="propertydetail-price-label">Price:</p>
//               <p className="propertydetail-price-value">₹ {property.price.toLocaleString()}</p>
//             </div>
//             <div className="propertydetail-contact-section">
//               <p className="propertydetail-contact-label">Contact:</p>
//               <p className="propertydetail-contact-name">GYAAT</p>
//               <p className="propertydetail-contact-tagline">Let's find solutions</p>
//               <button className="propertydetail-contact-button">Enquire Now</button>
//             </div>
//           </div>
//           </div>
//         </div>

//         <div className="media-gallery">
//           <h3>Images</h3>
//           <div className="images-grid">
//             {property.images.map((img, index) => (
//               <div key={index} className="image-item">
//                 <img src={img.url} alt={`Property ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {property.videos.length > 0 && (
//           <div className="media-gallery">
//             <h3>Videos</h3>
//             <div className="videos-grid">
//               {property.videos.map((video, index) => (
//                 <div key={index} className="video-item">
//                   <video src={video.url} controls />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyDetail;










import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProperty, deleteProperty } from "../services/api";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearchPlus, faSearchMinus, faChevronLeft, faChevronRight,
  faEdit, faTrash, faSpinner, faMapMarkerAlt, faBed, faRulerCombined,
  faInfoCircle, faAlignLeft, faUserTie, faEnvelope, faImages, faVideo
} from '@fortawesome/free-solid-svg-icons';
import "../cssFiles/PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await getProperty(id);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        setDeleting(true);
        await deleteProperty(id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting property:", error);
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleImageChange = (direction) => {
    const total = property?.images?.length || 0;
    setActiveImageIndex((prev) => direction === 'next' ? (prev + 1) % total : (prev - 1 + total) % total);
  };

  if (loading) return <div className="loading-state"><FontAwesomeIcon icon={faSpinner} spin /> Loading...</div>;
  if (!property) return <div className="error-state">Property not found</div>;

  return (
    <div className="property-detail-container">
      <div className="property-card-header">
        <div className="property-agency-info">
          <h1>AASHRAY REALTY CONSULTANCY</h1>
          <p className="property-tagline">From Your Dream to Your Home</p>
        </div>
        <div className="property-codes">
          <p>Property Code: <span>ANGGKSSF001</span></p>
          <p>Ad Date: <span>{new Date(property.createdAt).toLocaleDateString()}</span></p>
        </div>
      </div>

      <div className="property-detail">
        <div className="property-header">
          <div>
            <h1 className="property-title">{property.title}</h1>
            <p className="property-meta">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.location?.address}
            </p>
          </div>
          <div className="property-actions">
            <button className="btn btn-primary" onClick={() => navigate(`/properties/edit/${property._id}`)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
              <FontAwesomeIcon icon={deleting ? faSpinner : faTrash} spin={deleting} /> {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <div className="property-image-description">
          <div className="property-media-section">
            <div className="main-image-container">
              {property.images.length > 0 && (
                <>
                  <img 
                    src={property.images[activeImageIndex].url} 
                    alt={`Property ${activeImageIndex + 1}`} 
                    className="main-image"
                    onClick={() => setIsLightboxOpen(true)}
                  />

                  <div className="image-controls">
                    <button className="control-button prev-button" onClick={() => handleImageChange('prev')}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="control-button next-button" onClick={() => handleImageChange('next')}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="image-thumbnails">
              {property.images.map((img, index) => (
                <div key={index} className={`thumbnail-container ${index === activeImageIndex ? 'active' : ''}`} onClick={() => setActiveImageIndex(index)}>
                  <img src={img.url} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          <div className="property-info-section">
            <div className="property-type-price">
              <span className={`property-badge ${property.type}`}>{property.type === "sale" ? "For Sale" : "For Rent"}</span>
              <div className="property-price">₹{property.price.toLocaleString()}</div>
            </div>

            <div className="property-features">
              <div className="feature-item"><FontAwesomeIcon icon={faBed} /> {property.bedrooms} Bedrooms</div>
              <div className="feature-item"><FontAwesomeIcon icon={faRulerCombined} /> {property.area} sq ft</div>
              <div className="feature-item"><FontAwesomeIcon icon={faInfoCircle} /> Status: {property.status}</div>
            </div>

            <div className="property-description">
              <h3><FontAwesomeIcon icon={faAlignLeft} /> Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="property-contact-card">
              <div className="contact-agent-info">
                <div className="agent-avatar"><FontAwesomeIcon icon={faUserTie} /></div>
                <div className="agent-details">
                  <h4>Contact Agent</h4>
                  <p>GYAAT</p>
                  <small>Let's find solutions</small>
                </div>
              </div>
              <button className="contact-button">
                <FontAwesomeIcon icon={faEnvelope} /> Enquire Now
              </button>
            </div>
          </div>
        </div>

        {property.images.length > 1 && (
          <div className="media-gallery">
            <h3><FontAwesomeIcon icon={faImages} /> Property Images</h3>
            <div className="images-grid">
              {property.images.map((img, index) => (
                <div key={index} className="image-item" onClick={() => setIsLightboxOpen(true)}>
                  <img src={img.url} alt={`Property ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {property.videos.length > 0 && (
          <div className="media-gallery">
            <h3><FontAwesomeIcon icon={faVideo} /> Property Videos</h3>
            <div className="videos-grid">
              {property.videos.map((video, index) => (
                <div key={index} className="video-item">
                  <video src={video.url} controls />
                </div>
              ))}
            </div>
          </div>
        )}

         {isLightboxOpen && (
          <Lightbox
            mainSrc={property.images[activeImageIndex].url}
            nextSrc={property.images[(activeImageIndex + 1) % property.images.length]?.url}
            prevSrc={property.images[(activeImageIndex + property.images.length - 1) % property.images.length]?.url}
            onCloseRequest={() => setIsLightboxOpen(false)}
            onMovePrevRequest={() => setActiveImageIndex((activeImageIndex + property.images.length - 1) % property.images.length)}
            onMoveNextRequest={() => setActiveImageIndex((activeImageIndex + 1) % property.images.length)}
            imageTitle={`${property.title} - Image ${activeImageIndex + 1}`}
            imageCaption={property.location?.address}
          />
        )}


      </div>
    </div>
  );
};

export default PropertyDetail;

