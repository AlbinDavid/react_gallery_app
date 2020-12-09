import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Dropdown,DropdownButton } from 'reactstrap';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
// class Welcome extends React.Component{
//   render(){
//     return <h1>Hello ,this.props.name</h1>;

//   }
// }

function Welcome(props){

return <h1>Hello ,{props.name}</h1>;
}
const element = <Welcome name="Sara"/>;  
// function tick() {
// const element = (
//     <div> <h1>hello world</h1>
//           <h2>It is {new Date().toLocaleTimeString()}</h2>
//     </div>
// )
let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);
  const [upload_images,uploadImages] = React.useState([]);
  React.useEffect(() => {
    fetchImages();
  }, []);

  // React.useEffect(() => {
  //   onImageChange();
  // }, []);

  const fetchImages = (count = 0) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "VGJqw9PgX-iDq4SkXKv5qZiw-7e2vfRpzAdX6ETHM_8";
  
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then (res => {
        res.data=[]
        if (res.data.length<=0){
          console.log("empty");
          setImages([...images,...res.data]);
          setIsLoaded(false);
        }
        else if (res.data.length>0)
{

        console.log(res.data)
        console.log(res.data.length)
        setImages([...images,...res.data]);
        setIsLoaded(true);
}
      });
  };

  // class DisplayImage extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       image: null
  //     };
  
  //     this.onImageChange = this.onImageChange.bind(this);
  //   }
  
  const  onImageChange = (e) => {
       console.log("onchange")
       console.log(e)
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        uploadImages([...upload_images,URL.createObjectURL(img)]);
        console.log(upload_images);
        // this.setState({
        //   image: URL.createObjectURL(img)
        // });
      }
    };
  
  return (<div className="hero is-fullheight is-bold is-info">
              <div className="hero-body">
                  <div className="container">
                        <div className="header content">
                              {/* <h2 className="subtitle is-6">Image Gallery
                              </h2> */}
                        
                        <h1 className="title is-1">
              Image Gallery
                        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                            <Dropdown.Item href="#/action-1">Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else
                            </Dropdown.Item>
                        </DropdownButton>
                        <input type="file"  name="myImage" onChange={(e) => onImageChange(e)} accept="image/*" />

                        <InfiniteScroll
                            dataLength={images}
                            next={() => fetchImages(5)}
                            hasMore={true}
                            loader={
                                  <img
                                    src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif1"
                                    alt="Upload an Image"
                                  />}>
                                    <div className="image-grid" style={{ marginTop: "30px" }}>
                                        {loaded ?
                                            images.map((image, index) => (
                                                <UnsplashImage url={image.urls.regular} key={index} />
                                            )): ""}
                                    </div>
                        </InfiniteScroll>
                        </h1>
                        </div>
          </div>
          </div>            
          </div>)
}
const UnsplashImage=({url,key}) => (
  <div className="image-item" key={key}>
    <img src={url} />
  </div>
)



ReactDOM.render(
  <Collage />,
  // <React.StrictMode>
    // {/* <App /> */}
  // {/* </React.StrictMode>, */}
  document.getElementById('root')
);
// }
// setInterval(tick,1000);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
