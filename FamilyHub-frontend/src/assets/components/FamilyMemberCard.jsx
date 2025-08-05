// components/FamilyMemberCard.jsx
import React from "react";
import { FaMale, FaFemale, FaUserAlt, FaHeart, FaSkull } from "react-icons/fa";
import defaultImage from "../images/default-user3.png";

const FamilyMemberCard = ({ member }) => {
  const genderIcon =
    member.gender === "male" ? (
      <FaMale />
    ) : member.gender === "female" ? (
      <FaFemale />
    ) : (
      <FaUserAlt />
    );

  const statusIcon =
    member.status === "alive" ? (
      <FaHeart color="green" />
    ) : (
      <FaSkull color="red" />
    );

  return (
    <div className="card shadow-sm h-200">
      <img
        src={member.image || defaultImage}
        className="card-img-top"
        alt={member.name}
        style={{ objectFit: "cover", height: "200px", width: "100" }}
      />
      <div className="card-body">
        <h5 className="card-title">{member.name}</h5>
        <p className="card-text">Relation: {member.relation}</p>
        <p className="card-text">Gender: {genderIcon}</p>
        <p className="card-text">Status: {statusIcon}</p>
      </div>
    </div>
  );
};

export default FamilyMemberCard;
