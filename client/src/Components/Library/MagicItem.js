import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MagicItem = () => {
  const { slug } = useParams();
  const [magicitem, setMagicItem] = useState(null);

  const [ID, setID] = useState(0);

  const fetchMagicItem = async () => {
    const apiCall = await fetch(`https://api.open5e.com/magicitems/${slug}`);
    const data = await apiCall.json();
    setMagicItem(data);
  };

  useEffect(() => {
    fetchMagicItem();
  }, [ID]);

  return (
    
    <div>
      {magicitem && (
        <div>
        <div>{magicitem.name}</div>
        <div>{magicitem.type}</div>
        <div>{magicitem.desc}</div>
        <div>{magicitem.rarity}</div>
        <div>{magicitem.requires_attunement}</div>
        </div>
      )}
      
    </div>
  );
};

export default MagicItem;
