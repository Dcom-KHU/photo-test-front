/* 공통으로 사용할 추상화된 Component 
  리액트가 제공해주는 functional component 를 직접 구현한거라고 생각하면 된다.

  이해를 위해 주요 기능 SPEC을 리액트 컴포넌트와 매칭하면 아래와 같다.
  constructor: useEffect(()=> {}, []) 
    -> 컴포넌트 함수 실행시 최초 한번 실행되는 useEffect의 기능
  setup -> 상테 관련 초기 셋업
  template -> html 템플릿
  setEvent -> useState에서 state 변경을 감지하는 부분
              state마다 addEventListener를 달아서 어떤 state가 변경됨을 감지할때마다 콜백함수가 실행되게 함
  setState -> useState의 setState와 동일한 동작을 함
  render -> 작성된 template을 target DOM element에 붙혀주는 역할
*/

class Component{
  $target; //$는 private variable을 의미, target: DOM element
  state = {}; //state: 컴포넌트의 상태
  constructor($target){
    this.$target = $target;
    // 비동기 작업을 위해 init 함수를 추가하여 우회
    return this.init();
  }
  async init(){
    await this.setup();
    return this;
  }
  setup(){}
  template () {return ''};
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.state = {...this.state, newState}
  }
}

/* 실제 메인 동작을 관장하는 App 컴포넌트 
  생성자와 render 같은 함수는 건들일 필요 없이 app-specific한 함수들만 override 해줍니다.
*/

class App extends Component{
  async setup(){
    this.state = { photos: await this.fetchPhotos()};
  }
  template() {
    const { photos } = this.state;
    return `
      <div style="display: flex; flex-direction: column">
        ${photos.map(photo => `<img width="400" src=${photo}/>`)}
      </div>
    `
  }
  async fetchPhotos () {
    const result = await fetch('/api/photos');
    const body = await result.json();

    return body;
  }
}

/* DOM에 렌더링 */
new App(document.querySelector('#app'));
