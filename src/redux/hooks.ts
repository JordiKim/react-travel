import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
    useDispatch,
} from "react-redux";
import { RootState, AppDispatch } from "./store";

// 重新定義useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
