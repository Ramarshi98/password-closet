export const BACKEND_URL =  'https://dummyapi.io/data/v1';
export const ENTRY_ENDPOINT = '/user/';

export const TEST_API_KEY = '638a51ead5f6176cb6309248';

const testAPI = async () => {
    let res;
    try {
      res = await axios.get(BACKEND_URL + '/user?page=1&limit=5', {
        headers: {
          'app-id': '638a51ead5f6176cb6309248',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    } catch (err) {
      console.log('error: ' + err);
    }
    console.log(res.data);
  };