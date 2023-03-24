import React, {useEffect} from "react";
import Auth from "../Components/Auth/Auth";
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
import DialogBox from "../Components/Error/DialogBox";
import Manager from "../Components/Manager/Manager";

const Admin = () => {
  const [promptAuth, setPromptAuth] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const user = useSelector(state => state.user.user);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    //make a request to firestore to see if user is an admin
   
    if (user !== null) {
      const usersRef = collection(db, "users");
      const isAdminQuery = query(usersRef, where("email", "==", user.email), where("role", "==", "admin"));
     
      getDocs(isAdminQuery).then((querySnapshot) => {
        if (querySnapshot.empty) {
          setPromptAuth(true);
          setOpenDialog(true);
        } else {
          setPromptAuth(false);
        }
      }
      ).catch((error) => {
        setOpenDialog(true);
      }
      );
    }
  }, [user]);
  
  return (
    <div>
      {
        openDialog && (
          <DialogBox message="You are not authorized to view this page" onClose={handleCloseDialog}/>
        )
      }
      
      {
        (promptAuth) ? (
          <Auth/>
        ) :
        (
          <Manager/>
        )
      }
    </div>
  );
}

export default Admin;