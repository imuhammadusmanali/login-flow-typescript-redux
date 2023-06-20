import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { addUser, getUser, selectUser } from '../redux/features/userSlice';
import { AddUserPayload, User } from '../../types';
import { addDoc, getDocs, where, query } from 'firebase/firestore';

jest.mock('firebase/firestore');

const middlewares = [thunk];
const mockStore = configureMockStore<{}, ThunkDispatch<{}, void, Action<any>>>(
  middlewares
);

describe('usersSlice', () => {
  let store: MockStoreEnhanced<unknown, any>;

  beforeEach(() => {
    store = mockStore({} as any) as MockStoreEnhanced<unknown, any>;
  });

  describe('addUser', () => {
    it('should dispatch the addUser.pending action', () => {
      const payload: AddUserPayload = {
        user: {
          displayName: 'John Doe',
          email: 'johndoe@example.com',
          emailVerified: false,
          phoneNumber: '1234567890',
          photoURL: '',
          uid: '',
        },
        navigate: jest.fn(),
      };

      store.dispatch(addUser(payload));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(addUser.pending.type);
    });

    it('should dispatch the addUser.fulfilled action', async () => {
      const payload: AddUserPayload = {
        user: {
          displayName: 'John Doe',
          email: 'johndoe@example.com',
          emailVerified: false,
          phoneNumber: '1234567890',
          photoURL: '',
          uid: '',
        },
        navigate: jest.fn(),
      };

      const mockAddDoc = jest.fn();
      (addDoc as jest.Mock).mockResolvedValue(mockAddDoc());

      await store.dispatch(addUser(payload));

      const actions = store.getActions();

      expect(actions[1].type).toEqual(addUser.fulfilled.type);
      expect(actions[1].payload).toEqual(payload.user);
      expect(mockAddDoc).toHaveBeenCalled();
    });

    it('should dispatch the addUser.rejected action', async () => {
      const payload: AddUserPayload = {
        user: {
          displayName: 'John Doe',
          email: 'johndoe@example.com',
          emailVerified: false,
          phoneNumber: '1234567890',
          photoURL: '',
          uid: '',
        },
        navigate: jest.fn(),
      };

      const error = new Error('Failed to add user');
      const mockAddDoc = jest.fn(() => Promise.reject(error));
      (addDoc as jest.Mock).mockResolvedValue(mockAddDoc());

      await store.dispatch(addUser(payload)).catch(() => {});

      const actions = store.getActions();

      expect(actions[1].type).toEqual(addUser.rejected.type);
      expect(actions[1].error.message).toBeDefined();
      expect(mockAddDoc).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should dispatch the getUser.pending action', () => {
      const payload = {
        uid: '',
        navigate: jest.fn(),
      };

      store.dispatch(getUser(payload));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(getUser.pending.type);
    });

    it('should dispatch the getUser.fulfilled action', async () => {
      const payload = {
        uid: '1234567890',
        navigate: jest.fn(),
      };

      const mockUser: User = {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
        emailVerified: false,
        phoneNumber: '1234567890',
        photoURL: '',
        uid: '1234567890',
      };

      const mockQuerySnapshot = {
        empty: false,
        docs: [
          {
            data: () => mockUser,
          },
        ],
      };

      const mockQuery = {
        where: jest.fn(),
        get: jest.fn(() => Promise.resolve(mockQuerySnapshot)),
      };

      (query as jest.Mock).mockReturnValue(mockQuery);
      (where as jest.Mock).mockReturnValue(mockQuery);
      (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

      await store.dispatch(getUser(payload));

      const actions = store.getActions();

      expect(actions[1].type).toEqual('users/getUser/fulfilled');
      expect(actions[1].payload).toEqual(mockUser);
    });

    it('should dispatch the getUser.rejected action', async () => {
      const payload = {
        uid: '',
        navigate: jest.fn(),
      };

      const error = new Error('Failed to get user');
      const mockQuerySnapshot = {
        empty: true,
      };

      const mockQuery = {
        where: jest.fn(),
        get: jest.fn(() => Promise.resolve(mockQuerySnapshot)),
      };

      (query as jest.Mock).mockReturnValue(mockQuery);
      (where as jest.Mock).mockReturnValue(mockQuery);
      (getDocs as jest.Mock).mockRejectedValue(error);

      await store.dispatch(getUser(payload)).catch(() => {});

      const actions = store.getActions();

      expect(actions[1].type).toEqual(getUser.rejected.type);
      expect(actions[1].error.message).toBeDefined();
    });
  });

  describe('selectUser', () => {
    it('should select the user from the state', () => {
      const state = {
        users: {
          user: {
            displayName: 'John Doe',
            email: 'johndoe@example.com',
            emailVerified: false,
            phoneNumber: '1234567890',
            photoURL: '',
            uid: '',
          },
          loading: false,
          error: null,
        },
      };

      const selectedUser = selectUser(state);
      expect(selectedUser).toEqual(state.users.user);
    });
  });
});
