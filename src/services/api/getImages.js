import { UNSPLASH_URL } from "../routes";

export default async function getImages(query) {
  try {
      const response =  await fetch(
      UNSPLASH_URL + query + "&client_id=" + process.env.REACT_APP_CLIENT_ID,
      {
        method: "GET",
      }
    )
    return response.json();
  } catch (e) {}
}
