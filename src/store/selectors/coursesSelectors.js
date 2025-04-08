import { coursesAdapter } from "../features/coursesSlice";

export const { selectAll, selectById } = coursesAdapter.getSelectors(state => state.courses);