import React from 'react';
import styles from '../User/CSS/Profile.module.css';
import Avatar from '@material-ui/core/Avatar';
import Navbar from '../Navigation/Navbar';
import AuthService from '../../ApiServices/services'
import Alerts from '../Alert/Alert';
import Button from '@material-ui/core/Button';
import Travelling from '../User/travelling';

function Group(props){

    
    const [userId,setuserId]=React.useState(props.match.params.userId);
    const [user,setUser]=React.useState(null);
    const [name,setUserName]=React.useState(null);
    const [userbioo,setUserBio]=React.useState(null);
    const [Alert,setAlert]=React.useState(null);
    const [profile_picture,setProfile]=React.useState('sa');
    const [friend,setFriend]=React.useState(null);
    const [image_file,imageHandler]=React.useState(null);
    const [image_name,imageNameHandler]=React.useState(null);
    const [me,meHandler]=React.useState(null);

    React.useEffect( ()=>{
        AuthService.Profile(userId)
        .then(response => {
            console.log('Response:', response) 
            if(response.status ===201 || response.status ===200 || response.status ===202) 
                { 
                setUser(response.data);
            
                }
            
            else if(response.status===401) alert("Something went wrong")})
            
        .catch(error=>{console.log(error.response); 
           
            
        })
  
      }, []);
      

      const inputHandlerBio=(event)=>{
        setUserBio(event.target.value);
        console.log(userbioo)
      }

      const inputHandlerName=(event)=>{
        setUserName(event.target.value);
        console.log(name)
     }

     const GroupMembers = [
         {name:"Neha"},
         {name:"annu"},
         {name:"soni"},
         {name:"pranjal"},
         
     ]

      const sumbitHandler=()=>{

        let formData={};
        console.log("name=",name);
        console.log("bio=",userbioo);
        formData ={profile: {
            "name":name,
            "bio":userbioo,
        }}
        console.log(formData);
        if(name == null){
            if(user!==null){
                 console.log("user didnt type anything");
                 formData["profile"]["name"]=user.profile.name;
                 formData["profile"]["bio"]=user.profile.bio;   
            }
            else setAlert({type:"warning",text:"Username can't be left blank"})
        }
        
        if(formData['name']!==null){
            AuthService.EditProfile(userId,formData)
            .then(response => {

                console.log('Response:', response) 
                if(response.status ===201 || response.status ===200 || response.status ===202) 
                
                    { 
                    
                    setUser(response.data);
                    setAlert({type:"success",text:"Successfully changed!"})
                    
                
                    }})
                
                
            .catch(error=>{console.log(error.response); 
                setAlert({type:"warning",text:error.response.data.profile.name})
                
            })
       }
      }

      const fileSelectorHandler = event =>{
    
        const image_file = event.target.files[0];
        const image_name=URL.createObjectURL(event.target.files[0]);
       
        imageHandler(image_file);
        imageNameHandler(image_name);
    }
      let userName,bio,id=null;

      if(user!==null){
        userName=user.profile.name;
        bio=user.profile.bio;
        if(bio===null){
            bio="I like organisation";
        }
        id=user.profile.id;
    }
    
    let alert;

    if(Alert!==null)
        alert = (<Alerts type={Alert.type} text={Alert.text} />);

    const Profile_picture=(
        profile_picture == null ?  <Avatar className={styles.avatar}/> : 
        <div className={styles.profile_picture}>
            <img src="/images/groupIcon.png" alt="profile picture" />
        </div>
    );

    return (
        <div className={styles.ProfileFont}>
        <Navbar/>
        {alert}
        <div className={styles.profileSection}>
            <div className={styles.profile}>
                <div className={styles.flex_col_center}>
                    {Profile_picture}

                    
                </div>    

              <div className={styles.profile_personal}>
                <h5 className={styles.userName}>{"Members: "}{GroupMembers.length}</h5>
                <div className={styles.group}>
                    {GroupMembers.map((x,index)=>{
                            return  <h5 className={styles.group_members}>{x.name}</h5>
                        })
                    }
               </div>

              </div>
              {friend === null ? <Button variant="contained" color="secondary">Request saheli</Button>
                : <Button variant="contained" color="primary">Connected</Button>}
 
            </div>  
        </div>

        <div className={styles.AboutSection}>
            <div className={styles.bio}>

            {me===null ? 
                <Travelling/>
                
                : 
                <div>  
                    <div className={styles.user}>
                        <h4 className={styles.AboutText} >About user</h4>
                        <hr className={styles.About}/>
                        <h5>Username</h5>
                        <input className={styles.input} type="text"
                        defaultValue={userName}
                        placeholder="Enter your name"
                        onChange={(event)=>inputHandlerName(event)}/>
                    </div>

                
                    <div className={styles.bioDesc}>
                        <h5>location</h5>
                        <input className={styles.input} type="text"
                            defaultValue={bio}
                            placeholder="edit your location"
                            onChange={(event)=>inputHandlerBio(event)}/>
                    </div>

                    <button onClick={sumbitHandler} >Save</button>
                </div>  
            }
            
        </div>
        </div>
        </div>
    );    
}

export default Group;