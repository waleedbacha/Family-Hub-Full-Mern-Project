// components/FamilyTreeView.jsx
import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { Card } from "react-bootstrap";
import "./FamilyTreeView.css";

const MemberCard = ({ member }) => {
  return (
    <Card className="tree-card text-center shadow-sm">
      <div className="p-2">
        <h6 className="mb-1 text-dark fw-bold">{member.name}</h6>
        <small className="text-muted">{member.relation}</small>
      </div>
    </Card>
  );
};

const buildTree = (members) => {
  const memberMap = {};
  const roots = [];

  // Initialize map and children array
  members.forEach((member) => {
    memberMap[member._id] = { ...member, children: [] };
  });

  // Assign children to their parent
  members.forEach((member) => {
    const parentId = member.parentId || member.parent?._id;
    if (parentId && memberMap[parentId]) {
      memberMap[parentId].children.push(memberMap[member._id]);
    } else {
      roots.push(memberMap[member._id]);
    }
  });

  return roots;
};

const renderTree = (node) => {
  return (
    <TreeNode key={node._id} label={<MemberCard member={node} />}>
      {node.children.map((child) => renderTree(child))}
    </TreeNode>
  );
};

const FamilyTreeView = ({ histories }) => {
  const roots = buildTree(histories);

  if (!roots.length)
    return <p className="text-danger">No root member found.</p>;

  return (
    <div className="tree-wrapper py-5">
      {roots.map((root) => (
        <Tree
          key={root._id}
          lineWidth={"2px"}
          lineColor={"#0d6efd"}
          lineBorderRadius={"10px"}
          label={<MemberCard member={root} />}
        >
          {root.children.map((child) => renderTree(child))}
        </Tree>
      ))}
    </div>
  );
};

export default FamilyTreeView;
