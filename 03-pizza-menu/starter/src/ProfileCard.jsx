function ProfileCard(props) {
  const {
    info: { userImg, name, bio, skills },
  } = props;

  return (
    <div style={{ border: "3px solid #000", width: "350px" }}>
      <img src={userImg} alt="User Image" style={{ width: "100%" }} />

      <div style={{ padding: "15px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "26px" }}>{name}</h3>
        <p style={{ marginBottom: "12px", fontSize: "14px" }}>{bio}</p>
        <SkillList skills={skills} />
      </div>
    </div>
  );
}

function SkillList(props) {
  const { skills } = props;

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {/* <Skill skill={skills[0]} color="red" />
      <Skill skill={skills[1]} color="green" />
      <Skill skill={skills[2]} color="yellow" />
      <Skill skill={skills[3]} color="rgba(0, 204, 255, 0.4)" /> */}
      {/* {skills.map((skills, i) => {
        return <Skill skill={skills} color="yellow" />;
      })} */}
      {skills.map((skill, i) => {
        return <Skill skill={skill} key={i} />;
      })}
    </div>
  );
}

function Skill(props) {
  const {
    skill: { skill, level, color },
  } = props;
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "8px 12px",
        borderRadius: "6px",
        fontWeight: "bold",
      }}
    >
      {skill}
      {level === "advanced" && " 😎"}
      {level === "intermediate" && " 👍"}
      {level === "beginner" && " 👏"}
    </div>
  );
}

export default ProfileCard;
