import { studentsAdapter } from '../features/studentsSlice'

export const { selectAll, selectById } = studentsAdapter.getSelectors(state => state.students);