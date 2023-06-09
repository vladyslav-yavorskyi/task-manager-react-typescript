import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../../models';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../app/.firebase';

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    fetchAllTasks: builder.query({
      async queryFn({ user, date }) {
        try {
          const ref = collection(db, `accounts/${user}/${date}`);
          const querySnapshot = await getDocs(ref);
          let allTasks: ITodo[] = [];
          querySnapshot?.forEach((doc) => {
            allTasks.push({ idTask: doc.id, ...doc?.data() } as ITodo);
          });

          return { data: allTasks };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.massage };
        }
      },
      providesTags: ['Task'],
    }),
    createNewTask: builder.mutation({
      async queryFn({ user, value, date }) {
        try {
          const taskRef = collection(db, `accounts/${user}/${date}`);
          await addDoc(taskRef, {
            title: value,
            completed: false,
            time: date,
          });

          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.massage };
        }
      },
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      async queryFn({ user, id, date }) {
        try {
          const taskRef = doc(db, `accounts/${user}/${date}/${id}`);
          await deleteDoc(taskRef);
        } catch (e) {
          console.error(e);
        }
        return { data: null };
      },
      invalidatesTags: ['Task'],
    }),
    updateCheck: builder.mutation({
      async queryFn({ user, date, id, setDone }) {
        try {
          const taskRef = doc(db, `accounts/${user}/${date}/${id}`);

          const getCompleted = !(await getDoc(taskRef)).data()?.completed;

          await updateDoc(taskRef, {
            completed: getCompleted,
          });
          setDone(getCompleted);
        } catch (e) {
          console.error(e);
        }
        return { data: null };
      },
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useFetchAllTasksQuery,
  useCreateNewTaskMutation,
  useDeleteTaskMutation,
  useUpdateCheckMutation,
} = firestoreApi;
