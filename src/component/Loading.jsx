
const LoadingPage = ({loadingView}) => {
  return(
    
    <div className={`loading-page ${loadingView}`}>
      <div className="loadingio-spinner-eclipse-a30kpzlzuc6">
        <div className="ldio-xczltaiaxm">
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage;

//use
// import { alertState, userState, loadingState } from '../recoil/state'
// const [ loading, setLoading ] = useRecoilState(loadingState);
// setLoading("show");
// setLoading("hide");
