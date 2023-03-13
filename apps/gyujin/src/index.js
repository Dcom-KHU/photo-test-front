const api = {
  getPhotos: async () => {
    const response = await fetch('/api/photos');
    const body = await response.json();
    return body;
  },
  getSecretPhotos: async ({ accessToken }) => {
    const response = await fetch('/api/photos/secret', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const body = await response.json();
    return body;
  },
  postLogin: async ({ username, email }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, email }),
    });
    const body = await response.json();
    return body.access_token;
  },
};

class App {
  constructor({ initialState }) {
    this.state = initialState;
  }
}

const initialState = {
  isModalOpen: false,
  photos: [],
  accessToken: null,
};
const app = new App({ initialState });
