import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";

const Conditions = () => {
  const history = useHistory();
  const [conditions, setConditions] = useState("");
  const [ID, setID] = useState(0);

  const fetchConditions = async () => {
    const apiCall = await fetch("https://api.open5e.com/conditions");
    const data = await apiCall.json();
    setConditions(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    fetchConditions();
  }, [ID]);

  return (
    conditions && (
      <div>
        {conditions.map((condition) => {
          return (
            <ConditionDiv>
              <ConditionName>{condition.name}</ConditionName>
              <ConditionDesc>{condition.desc}</ConditionDesc>
            </ConditionDiv>
          );
        })}
        <Footer />
      </div>
    )
  );
};

const ConditionName = styled.h2`
  border-bottom: 2px solid rgba(0,0,0,.2);
  max-width: 225px;
`
const ConditionDesc = styled.div`
  font-size: 24px;
  margin-bottom: 35px;
`

const ConditionDiv = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export default Conditions;
