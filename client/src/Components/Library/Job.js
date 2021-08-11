import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";

const Job = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);

  const [ID, setID] = useState(0);

  const fetchJob = async () => {
    const apiCall = await fetch(`https://api.open5e.com/classes/${slug}`);
    const data = await apiCall.json();
    setJob(data);
  };

  useEffect(() => {
    fetchJob();
  }, [ID]);

  return (
    <div>
      {job && (
        <Container>
          <JobName>{job.name}</JobName>
          <ClassContainer>
            <ClassDiv><strong>Hit Dice:</strong> {job.hit_dice}</ClassDiv>
            <ClassDiv><strong>HP at first level:</strong> {job.hp_at_1st_level}</ClassDiv>
            <ClassDiv><strong>HP at higher levels: </strong>{job.hp_at_higher_levels}</ClassDiv>
            <ClassDiv><strong>Spellcasting ability:</strong> {job.spellcasting_ability}</ClassDiv>
            <ClassDiv><strong>Armor Proficiency: </strong>{job.prof_armor}</ClassDiv>
            <ClassDiv><strong>Weapon Proficiency: </strong>{job.prof_weapons}</ClassDiv>
            <ClassDiv><strong>Tool Proficiency: </strong>{job.prof_tools}</ClassDiv>
            <ClassDiv><strong>Saving Throws: </strong>{job.prof_saving_throws}</ClassDiv>
            <ClassDiv><strong>Skill Proficiency: </strong>{job.prof_skills}</ClassDiv>
            <ClassDiv><strong>Equipment: </strong>{job.equipment}</ClassDiv>
            {/* Look into importing their table */}
            
            <ClassDiv><strong>Class Abilities</strong>{job.desc}</ClassDiv>
            <div>{job.subtypes_name}:</div>
            <div>{job.archetypes.map((archetype) => {
              return (
                <div>
                <div><strong>{archetype.name}</strong></div>
                <div>{archetype.desc}</div>
                </div>
              )
            })}</div>
          </ClassContainer>
          
        </Container>
      )}
      <Footer />
    </div>
  );
};

const JobName = styled.h1`
  margin-top: 20px;
  border-bottom: 2px solid rgba(0,0,0,.1);
  width: 8vw;

`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
`

const ClassContainer = styled.div`
  margin-top: 20px;
`

const ClassDiv = styled.div`
  margin-top: 10px;
`

export default Job;
