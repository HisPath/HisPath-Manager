import { atom } from "recoil";

export const mileageState = atom({
  key: "mileage",
  default: [],
});

export const studentState = atom({
  key: "student",
  default: [],
});

export const managerState = atom({
  key: "manager",
  default: [],
});

export const semesterState = atom({
  key: "semester",
  default: "2022-2",
});

export const categoryState = atom({
  key: "category",
  default: [],
});

export const departmentState = atom({
  key: "department",
  default: [],
});

export const majorState = atom({
  key: "major",
  default: [],
});

export const scholarshipState = atom({
  key: "scholarship",
  default: [],
});

export const scholarshipListState = atom({
  key: "scholarshipList",
  default: [],
});
