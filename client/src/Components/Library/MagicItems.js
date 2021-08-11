import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const MagicItems = () => {
  let [magicItems, setMagicItems] = useState(undefined)
  const [page, setPage] = useState(1);

  const history = useHistory()

  const handleNext = () => {
    setPage(page + 1);
    history.push(`/magicitems/${page}`);
  };

  const handlePrev = () => {
    setPage(page - 1);
    history.push(`/magicitems/${page}`);
  };


  const fetchMagicItems = async () => {
    const apiCall = await fetch(`https://api.open5e.com/magicitems/?page=${page}`)
    const data = await apiCall.json()
    setMagicItems(data.results)
  }

  useEffect(() => {
    fetchMagicItems()
  }, [page])
  
const getMagicItem = (slug) => {
    history.push(`/magicitem/${slug}`)
  }




  return (
    <div>
      {magicItems &&
    <div>
      {magicItems.map((item) => {
        return (
          <div onClick={() => {
            getMagicItem(item.slug)
          }} >
          {item.name}
          <div>{item.type}</div>
          <div>{item.rarity}</div>
          </div>
        )
      })}
      <button onClick={handleNext}>Next</button>
    </div>
    }
    </div>
    
    
  )
}

export default MagicItems;