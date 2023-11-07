import React from 'react'
import PropertyRow from '../PropertyRow/PropertyRow';

const PropertyTable = ({ properties, filterText1, filterText2, userId, SearchCity, SearchProperty}) => {
  console.log("UserID Property Table: ", userId)
  const rows = [];
  const rows2 = [];

  if(!SearchProperty && !SearchCity){
    properties.forEach((property) => {
      if (property.type.toLowerCase().indexOf(filterText2.toLowerCase()) === -1)
        return;
      rows.push(
        <PropertyRow property={property} key={property.title} userId={userId}/>
      );
    })
  }

  if(SearchCity && !SearchProperty){
    properties.forEach((property) => {
      if (property.title.toLowerCase().indexOf(filterText1.toLowerCase()) === -1)
        return;
      rows.push(
        <PropertyRow property={property} key={property.title} userId={userId}/>
      );
    })
  }
  
  if(SearchProperty && !SearchCity){
    properties.forEach((property) => {
      if (property.type.toLowerCase().indexOf(filterText2.toLowerCase()) === -1)
        return;
      rows.push(
        <PropertyRow property={property} value={property.type} userId={userId}/>
      );
    })
  }

  if(SearchCity && SearchProperty){
    properties.forEach((property) => {
      // console.log(filterText1)
      // console.log(filterText2)
      if ((property.title.toLowerCase().indexOf(filterText1.toLowerCase()) === -1) && (property.type.toLowerCase().indexOf(filterText2.toLowerCase()) === -1)){
        return;
      }
      
      if(property.title.toLowerCase().indexOf(filterText1.toLowerCase()) !== -1){
        rows2.push(property);
      }
    });
    rows2.forEach((property) => {
      if(property.type.toLowerCase().indexOf(filterText2.toLowerCase()) !== -1){
        rows.push(
          <PropertyRow property={property} value={property.type} userId={userId}/>
        );
      }
    });
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', }}>
      {rows}
    </div>
  );
}


export default PropertyTable
