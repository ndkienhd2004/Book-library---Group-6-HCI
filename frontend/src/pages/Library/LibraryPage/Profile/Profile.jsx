import InputField from "../../../../components/InputField/InputField";

const Profile = () => {
  return (
    <div style={styles.container}>
      <h2 style={{ color: "black" }}>Name</h2>
      <InputField />
      <h2 style={{ color: "black" }}>Short bio</h2>
      <InputField />
    </div>
  );
};
export default Profile;

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: "5vh",
    flexDirection: "column",
    borderRadius: 10,
  },
};
