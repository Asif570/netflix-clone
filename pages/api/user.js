import serverAuth from "../../lib/serverAuth";
const user = async (req, res) => {
  const { currentUser } = await serverAuth(req);
  return res.status(200).json(currentUser);
};

export default user;
