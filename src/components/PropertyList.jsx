// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Grid,
//   Container,
//   Box,
//   TextField,
//   Pagination,
//   Chip,
//   CircularProgress
// } from '@mui/material';
// import { getProperties } from '../services/api';

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         const response = await getProperties();
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);

//   const filteredProperties = properties.filter(property =>
//     property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     property.location.address.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedProperties = filteredProperties.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Properties
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/properties/new')}
//         >
//           Add New Property
//         </Button>
//       </Box>
      
//       <TextField
//         fullWidth
//         label="Search Properties"
//         variant="outlined"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 3 }}
//       />
      
//       {paginatedProperties.length === 0 ? (
//         <Typography variant="h6" align="center" sx={{ mt: 4 }}>
//           No properties found
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {paginatedProperties.map((property) => (
//               <Grid item xs={12} sm={6} md={4} key={property._id}>
//                 <Card
//                   sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
//                   onClick={() => navigate(`/properties/${property._id}`)}
//                 >
//                   {property.images.length > 0 && (
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={property.images[0].url}
//                       alt={property.title}
//                     />
//                   )}
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {property.title}
//                     </Typography>
//                     <Chip
//                       label={property.type === 'sale' ? 'For Sale' : 'For Rent'}
//                       color={property.type === 'sale' ? 'primary' : 'secondary'}
//                       size="small"
//                       sx={{ mb: 1 }}
//                     />
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                       {property?.location?.address}
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                       ${property.price.toLocaleString()}
//                     </Typography>
//                     <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
//                       <Typography variant="body2">
//                         {property.bedrooms} beds
//                       </Typography>
//                       <Typography variant="body2">
//                         {property.area} sq ft
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
          
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//             <Pagination
//               count={Math.ceil(filteredProperties.length / itemsPerPage)}
//               page={page}
//               onChange={handlePageChange}
//               color="primary"
//             />
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default PropertyList;










import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../services/api';
import '../cssFiles/PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await getProperties();
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProperties = filteredProperties.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Properties</h2>
        <button onClick={() => navigate('/properties/new')}>Add New Property</button>
      </div>

      <input
        type="text"
        placeholder="Search Properties"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      {paginatedProperties.length === 0 ? (
        <p className="no-results">No properties found</p>
      ) : (
        <>
          <div className="grid">
            {paginatedProperties.map((property) => (
              <div
                key={property._id}
                className="card"
                onClick={() => navigate(`/properties/${property._id}`)}
              >
                {property.images.length > 0 && (
                  <img
                    src={property.images[0].url}
                    alt={property.title}
                    className="card-image"
                  />
                )}
                <div className="card-content">
                  <h3>{property.title}</h3>
                  <span className={`badge ${property.type === 'sale' ? 'sale' : 'rent'}`}>
                    {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                  <p className="address">{property?.location?.address}</p>
                  <p className="price">${property.price.toLocaleString()}</p>
                  <div className="details">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            {[...Array(Math.ceil(filteredProperties.length / itemsPerPage))].map((_, i) => (
              <button
                key={i + 1}
                className={page === i + 1 ? 'active' : ''}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
