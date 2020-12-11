import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Dropdown} from 'reactstrap';
// import DropdownButton from '@bit/react-bootstrap.react-bootstrap.dropdown-button';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
// let { DropdownList } = ReactWidgets
// import DropdownList from 'react-widgets/lib/DropdownList'
// import { DropDownList } from '@progress/kendo-react-dropdowns';
import Select from "react-dropdown-select";
import Dropdown from 'react-dropdown';
import jQuery from 'jquery';
import 'react-dropdown/style.css';
let colors = ['orange', 'red', 'blue', 'purple'];
let img = []
const defaultOption = colors[0];
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
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
  const [upload_images,uploadImages] = React.useState({file:null});
  const [category, updateCategory] = React.useState('');
  const [testimage,setTestimages]= React.useState([]);
  React.useEffect(() => {
    fetchImages();
  }, []);

  // React.useEffect(() => {
  //   onImageChange();
  // }, []);

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
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
  const updateCategoryvalue =(value) => {
    console.log(value);
    console.log(value.label);
    updateCategory(value.label);
    console.log(category);
  }
  const  onImageChange = (e) => {
       console.log("onchange");
       console.log(e);
       console.log(category);
      if (e.target.files && e.target.files[0]) {
        let img1 = e.target.files[0];
        // console.log(img1);
        uploadImages({file:img1});
        setTestimages([...testimage,img1]);
        const formData = new FormData(); 
        formData.append( 
          "myFile", 
          img1,  
        ); 

      }

    
        console.log(upload_images);
        console.log(testimage);
 
    };
    
  const activateLasers = (e)=> {

    console.log("inside new function");
    console.log(category);
    let form_data = new FormData();
    form_data.append('image',testimage);
    form_data.append('title',category);
    axios.post("http://localhost:8000/upload_image/",form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        // 'X-CSRFToken': csrftoken
      }
    })
    .then(function (response) {
      console.log(response);
    })
  }
  return (
    
  <div className="hero is-fullheight is-bold is-info">
    
              <div className="hero-body">
                  <div className="container">
                        <div className="header content">
                     
                        <h1 className="title is-1">
                            Image Gallery
                        </h1>
                        {/* <Select options={colors} onChange={(values) => updateCategory(values)} />   */}
                        <Dropdown options={colors} onChange={(values)=> updateCategoryvalue(values) } value={"Select an option"} placeholder="Select an option" />;
                        <input type="file"  name="myImage" onChange={(e) => onImageChange(e)} accept="image/*" />
                        <button onClick={activateLasers}>
                        Activate Lasers
                        </button>
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
                        
                        </div>
          </div>
          </div> 
                  
          </div>
          )

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
