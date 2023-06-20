import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

type User = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string | null;
};

type InitialState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AddUserPayload = {
  user: User;
  navigate: (path: string) => void;
};

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null,
};

export const addUser = createAsyncThunk<User, AddUserPayload>(
  'addUser',
  async ({ user, navigate }) => {
    try {
      const userRef = collection(db, 'user');
      await addDoc(userRef, user);
      navigate('/');
      return user;
    } catch (err: any) {
      if (err.code === 'already-exists-error-code') {
        return user;
      } else {
        throw new Error(err.message);
      }
    }
  }
);

export const getUser = createAsyncThunk<
  User | null,
  { uid: string | null; navigate: (path: string) => void }
>(
  'users/getUser',
  async ({
    uid,
    navigate,
  }: {
    uid: string | null;
    navigate: (path: string) => void;
  }): Promise<User | null> => {
    if (uid === null) {
      navigate('/login');
      throw new Error('Failed to get user');
    }

    try {
      const usersRef = collection(db, 'user');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocSnapshot = querySnapshot.docs[0];
        return userDocSnapshot.data() as User;
      } else {
        navigate('/login');
        throw new Error('Failed to get user');
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      throw new Error('Failed to get user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error?.message as string | null;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error?.message as string | null;
      });
  },
});

export const selectUser = (state: { users: InitialState }) => state.users.user;
export const selectLoading = (state: { users: InitialState }) =>
  state.users.loading;

export default usersSlice.reducer;
