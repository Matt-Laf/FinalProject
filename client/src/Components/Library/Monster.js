import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Monster = () => {
  const { slug } = useParams();
  const [monster, setMonster] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [skills, setSkills] = useState(null);
  const [actions, setActions] = useState(null);
  const [ID, setID] = useState(0);

  const fetchMonster = async () => {
    const apiCall = await fetch(`https://api.open5e.com/monsters/${slug}`);
    const data = await apiCall.json();
    setMonster(data);
    setSpeed(Object.entries(data.speed));
    setSkills(Object.entries(data.skills));
    setActions(data.actions);
  };

  console.log(actions);
  useEffect(() => {
    fetchMonster();
  }, [ID]);
  // todo: speed map, skills map
  return (
    <div>
      {monster && speed && skills && actions && (
        <div>
          <div><strong>
            {monster.name}
            </strong></div>
          <div><strong>Size: </strong>{monster.size}</div>
          <div><strong>Type: </strong>{monster.type}</div>
          <div><strong>Alignment: </strong>{monster.alignment}</div>
          <div><strong>AC: </strong>{monster.armor_class}</div>
          <div><strong>Armore Description: </strong>{monster.armor_desc}</div>
          <div><strong>Hit Points: </strong>{monster.hit_points}</div>
          <div><strong>Hit Dice: </strong>{monster.hit_dice}</div>
          <div>
            {speed.map((e, i) => {
              return (
                <div>
                  <strong>{e[0]} :</strong> {e[1]}
                </div>
              );
            })}
          </div>
          <div><strong>Strength: </strong>{monster.strength}</div>
          <div><strong>Dexterity: </strong>{monster.dexterity}</div>
          <div><strong>Constitution: </strong>{monster.constitution}</div>
          <div><strong>Intelligence: </strong>{monster.intelligence}</div>
          <div><strong>Wisdom: </strong>{monster.wisdom}</div>
          <div><strong>Charisma: </strong>{monster.charisma}</div>
          <div><strong>Strength Saving Throw: </strong>{monster.strength_save}</div>
          <div><strong>Dexterity Saving Throw: </strong>{monster.dexterity_save}</div>
          <div><strong>Constitution Saving Throw: </strong>{monster.constitution_save}</div>
          <div><strong>Intelligence Saving Throw: </strong>{monster.intelligence_save}</div>
          <div><strong>Wisdom Saving Throw: </strong>{monster.wisdom_save}</div>
          <div><strong>Charisma Saving Throw: </strong>{monster.charisma_save}</div>
          <div><strong>Perception: </strong>{monster.perception}</div>
          <div>
            {skills.map((e, i) => {
              return (
                <div>
                  <strong>{e[0]}: </strong>{e[1]}
                </div>
              );
            })}
          </div>
          <div><strong>Vulnerabilities: </strong>{monster.damage_vulnerabilities}</div>
          <div><strong>Resistances: </strong>{monster.damage_resistances}</div>
          <div><strong>Damage Immunities: </strong>{monster.damage_immunities}</div>
          <div><strong>Condition Immunities: </strong>{monster.condition_immunities}</div>
          <div><strong>Senses: </strong>{monster.senses}</div>
          <div><strong>Languages</strong>{monster.languages}</div>
          <div><strong>CR: </strong>{monster.challenge_rating}</div>
          <div>
            {actions.map((e, i) => {
              return (
                <div>
                  {e.name}: {e.desc}
                  {e.attack_bonus}
                  {e.damage_dice}
                </div>
              );
            })}
          </div>
          <div>{monster.reactions}</div>
          <div>{monster.legendary_desc}</div>
          <div>
            {monster.legendary_actions.map((e, i) => {
              return (
                <div>
                  {e.name}: {e.desc}
                  {e.attack_bonus}
                </div>
              );
            })}
          </div>
          <div>
            {monster.special_abilities.map((e, i) => {
              return (
                <div>
                  {e.name}: {e.desc}
                  {e.attack_bonus}
                </div>
              );
            })}
          </div>
          <div>
            {monster.spell_list.map((e, i) => {
              return (
                <div>
                  {e.name}: {e.desc}
                </div>
              );
            })}
          </div>
          <div>{monster.document__title}</div>
        </div>
      )}
    </div>
  );
};

export default Monster;
