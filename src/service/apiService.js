import axios from "axios";

const retrieveEndpointData = async (url) => {
  let resultObject = null;

  await axios
    .get(url)
    .then((response) => {
      resultObject = response;
    })
    .catch((error) => console.log(`Error: ${error}`));

  return resultObject;
};

export default retrieveEndpointData;
