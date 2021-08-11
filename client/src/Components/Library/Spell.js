import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const Spell = () => {
  const { slug } = useParams()
  const [spell, setSpell] = useState(null)
  const [ID, setID] = useState(0);

  const fetchSpell = async () => {
    const apiCall = await fetch(`https://api.open5e.com/spells/${slug}`);
    const data = await apiCall.json();
    setSpell(data);
  };

  useEffect(() => {
    fetchSpell();
  }, [ID]);

  return (
    <div>
      {spell && (
        <div>
        <div>{spell.name}</div>
        <div>{spell.desc}</div>
        <div>{spell.higher_level}</div>
        <div>{spell.page}</div>
        <div>{spell.range}</div>
        <div>{spell.component}</div>
        <div>{spell.material}</div>
        <div>{spell.ritual}</div>
        <div>{spell.duration}</div>
        <div>{spell.concentration}</div>
        <div>{spell.casting_time}</div>
        <div>{spell.level}</div>
        <div>{spell.school}</div>
        <div>{spell.dnd_class}</div>
        <div>{spell.archetype}</div>
        <div>{spell.circles}</div>
        </div>
      )}
    </div>
  )
}

export default Spell;