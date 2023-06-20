import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import RootState from '../redux/app/store';
import { getUser, selectUser } from '../redux/features/userSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<typeof RootState, void, AnyAction> =
    useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    const userProfile = localStorage.getItem('user');
    const localUser = userProfile ? JSON.parse(userProfile) : null;

    if (!user) {
      if (localUser) {
        dispatch(getUser({ uid: localUser.uid, navigate }));
      } else {
        dispatch(getUser({ uid: null, navigate }));
      }
    }
  }, [dispatch, navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {!user ? (
        <p className="ml-20 mt-10 text-xl">Loading...</p>
      ) : (
        <div className="ml-20 mt-10 text-xl">
          Welcome {user?.displayName}
          <button
            className="bg-gray-500 hover:bg-gray-500/80 transition-all duration-300 p-2 rounded-md shadow-md"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
