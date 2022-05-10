import { ChapterAction, ChapterState } from "./Context.types";

export default function ChapterReducer(state: ChapterState, action: ChapterAction) {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "PREV_PAGE":
      return {
        ...state,
        page: state.page - 1,
      };
    case "SELECT_PAGE":
      return {
        ...state,
        page: action.payload.pageNumber,
      };
    case "NEW_CHAPTER":
      return {
        ...state,
        chapter: action.payload.chapter,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    default:
      return state;
  }
}
