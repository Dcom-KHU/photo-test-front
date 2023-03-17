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
  state; //state: 컴포넌트의 상태
  constructor($target){
    this.$target = $target;
    this.setup();
    this.render();
  }

  setup = () => {}
  template = () => '';
  render = () => {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent = () => {}
  setState = (newState) => {
    this.state = {...this.state, newState}
  }
}
