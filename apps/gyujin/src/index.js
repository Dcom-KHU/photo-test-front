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
    this.$photoContainer = document.getElementById('photo');
    this.$loginModal = document.getElementById('modal');
    this.api = api;
    const $photoBtn = document.getElementById('btn-photo');
    const $secretBtn = document.getElementById('btn-secret');
    const $loginBtn = document.getElementById('btn-login');
    const $loginRequestBtn = document.getElementById('loginRequestBtn');
    $photoBtn.addEventListener('click', (e) => { this.loadPhotos(); });
    $secretBtn.addEventListener('click', (e) => { this.loadSecretPhotos(); });
    $loginBtn.addEventListener('click', (e) => this.openLoginModal());
    $loginRequestBtn.addEventListener('click', (e) => this.requestLogin());
    this.loadPhotos();
  }

  async loadPhotos() {
    const photos = await this.api.getPhotos();
    this.setState(
      { ...this.state, photos, isModalOpen: false },
    );
  }

  async loadSecretPhotos() {
    if (this.state.accessToken == null) {
      alert('로그인을 해주세요');
      return;
    }
    const photos = await this.api.getSecretPhotos({ accessToken: this.state.accessToken });
    this.setState(
      { ...this.state, photos, isModalOpen: false },
    );
  }

  openLoginModal() {
    this.setState(
      { ...this.state, isModalOpen: true },
    );
  }

  async requestLogin() {
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input');
    if (username.length === 0 || email.length === 0) {
      alert('입력해주세요.');
      return;
    }
    const accessToken = await this.api.postLogin({ username, email });
    this.setState({
      ...this.state,
      isModalOpen: false,
      accessToken,
    });
  }

  renderPhoto(photo) {
    return `<div><a href='${photo.url}'><img src='${photo.src.original}' alt='${photo.alt}'/></a><a href='${photo.photographer_url}'>${photo.photographer}</a>z</div>`;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$photoContainer.innerHTML = this.state.photos.map(this.renderPhoto).join('');
    this.$loginModal.style.display = this.state.isModalOpen ? 'block' : 'none';
  }
}

const initialState = {
  isModalOpen: false,
  photos: [],
  accessToken: null,
};
const app = new App({ initialState });
