import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import studentReducer from "./slices/studentSlice";
import teacherReducer from "./slices/teacherSlice";
import classReducer from "./slices/classSlice";
import subjectReducer from "./slices/subjectSlice";
import syllabusReducer from "./slices/syllabusSlice";
import examReducer from "./slices/examSlice";
import feeReducer from "./slices/feeSlice";
import admissionReducer from "./slices/admissionSlice";
import aiReducer from "./slices/aiSlice";
import themeReducer from "./slices/themeSlice";
import schoolReducer from "./slices/schoolSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    teacher: teacherReducer,
    classes: classReducer,
    subjects: subjectReducer,
    syllabus: syllabusReducer,
    exams: examReducer,
    fees: feeReducer,
    admissions: admissionReducer,
    ai: aiReducer,
    theme: themeReducer,
    school: schoolReducer,
    
  },
});
