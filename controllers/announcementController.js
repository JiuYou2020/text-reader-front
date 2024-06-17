import {getAnnouncement} from "@/api/apiEndpoints";
import {showTip} from "@/redux/store";
import {useDispatch} from "react-redux";

export const useAnnouncement = () => {
    const dispatch = useDispatch();
    const fetchAndSetAnnouncement = async (setAnnouncement, setLoading) => {
        const {success, errCode, errMessage, data} = await getAnnouncement();
        if (success) {
            setAnnouncement(data);
        } else {
            dispatch(showTip('获取公告失败：' + errMessage));
        }
        setLoading(false);
    }

    return {fetchAndSetAnnouncement};
}
