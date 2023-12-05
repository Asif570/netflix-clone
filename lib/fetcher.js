import axios from "axios";

const fetcher = async (url) => {
  return axios.get(url).then((r) => r.data);
};
export default fetcher;
