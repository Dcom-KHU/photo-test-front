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
const app = App({ initialState });
