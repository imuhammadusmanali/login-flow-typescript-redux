import { IoLogoGoogle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addUser, selectLoading } from '../redux/features/userSlice';
import { User } from '../../types';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import RootState from '../redux/app/store';

const Login: React.FC = () => {
  const dispatch: ThunkDispatch<typeof RootState, void, AnyAction> =
    useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const handleLogin = async () => {
    const res = await signInWithPopup(auth, provider);
    const userData = res.user;

    const user: User = {
      displayName: userData.displayName,
      email: userData.email,
      emailVerified: userData.emailVerified,
      phoneNumber: userData.phoneNumber,
      photoURL: userData.photoURL,
      uid: userData.uid,
    };

    dispatch(addUser({ user, navigate }));
  };

  return (
    <div className="h-screen w-full grid place-content-center">
      <div className="rounded-lg shadow-xl bg-gray-100 px-9 py-20">
        <div className="flex flex-col items-center gap-5">
          <p>Sign in with your google account</p>
          <button
            onClick={handleLogin}
            className=" bg-red-500 hover:bg-red-500/80 transition-all duration-300 grid place-content-center rounded-md px-12 py-2"
          >
            {loading ? (
              <p className="text-white font-semibold">Loading...</p>
            ) : (
              <IoLogoGoogle className="h-8 w-8 text-slate-50" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
