export default async function getData(endpoint = '', token = {}) {
  // Default options are marked with *
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    console.log('error: ', err);
  }
}
// ==============================================
