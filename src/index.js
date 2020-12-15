import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
let colors = ['orange', 'red', 'blue', 'purple',"All Categories"];
let img = []
const defaultOption = colors[0];
function Welcome(props){

return <h1>Hello ,{props.name}</h1>;
}
const element = <Welcome name="Sara"/>;
let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);
  const [upload_images,uploadImages] = React.useState(null);
  const [category, updateCategory] = React.useState('all');
  const [testimage,setTestimages]= React.useState([]);
  React.useEffect(() => {
    fetchImages();
  }, []);


  const fetchImages = (count = 0,label="all") => {

    images.length = 0;
    console.log(category);
    console.log(label);
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "VGJqw9PgX-iDq4SkXKv5qZiw-7e2vfRpzAdX6ETHM_8";
    const url ="http://localhost:8000/get_images/";
    const form_data = new FormData();
    form_data.append('category',label);
    axios.post(url,form_data,{
      headers: {
        'content-type': 'multipart/form-data',
      }
    }).then(res => 
      {
        console.log(res.data.data);
        if (res.data.data.length < 1)
        {
          console.log(res.data.data.length);
          res.data=[]
          setIsLoaded(false);
        }
        else if (res.data.data.length >0)
        {
        setImages([...images,...res.data.data]);
        setIsLoaded(true);
      }
      console.log(images.length);
      
      });

  };

  const updateCategoryvalue =(value) => {
    updateCategory(value.label,fetchImages(0,value.label));
    console.log(value);
    console.log(value.label);
    console.log(category);
  }
  const  onImageChange = (e) => {
       console.log("onchange");
       console.log(e);
       console.log(category);
      if (e.target.files && e.target.files[0]) {
        let img1 = e.target.files[0];
        uploadImages(img1);
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
    
  const uploadImage = (e)=> {
    console.log(images);
    console.log("inside new function");
    console.log(category);
    let form_data = new FormData();
    form_data.append('image',upload_images,upload_images.name);
    console.log(form_data);
    console.log('testing axios');
    form_data.append('title',category);
    axios.post("http://localhost:8000/upload_image/",form_data, {
      headers: {
        'content-type': 'multipart/form-data',
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
                        
                        <Dropdown options={colors} onChange={(values)=> updateCategoryvalue(values) } value={"Select an option"} placeholder="Select an option" />
                        <input type="file"  name="myImage" onChange={(e) => onImageChange(e)} accept="image/*" />
                        <button onClick={uploadImage}>
                        Upload Image
                        </button>
                        <InfiniteScroll
                            dataLength={images}
                            
                            hasMore={true}
                            >
                                    <div className="image-grid" style={{ marginTop: "30px" }}>
                                        {loaded ?
                                            images.map((image, index) => (
                                                <UnsplashImage url={"http://localhost:8000/media/"+image.image} key={index} />
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
  document.getElementById('root')
);
