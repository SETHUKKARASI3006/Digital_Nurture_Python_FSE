import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledCourses: [],
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    enroll(state, action) {
      const exists = state.enrolledCourses.some((c) => c.id === action.payload.id);
      if (!exists) {
        state.enrolledCourses.push(action.payload);
      }
    },
    unenroll: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;

export const selectEnrolledCourses = (state) => state.enrollment.enrolledCourses;
export const selectEnrolledCount = (state) => state.enrollment.enrolledCourses.length;

export default enrollmentSlice.reducer;
