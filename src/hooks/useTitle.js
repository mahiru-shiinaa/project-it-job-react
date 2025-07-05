import { useEffect } from "react";

/**
 * Custom hook để đổi title trang.
 * @param {string} title - Tiêu đề mới
 * @param {string} restore - Tiêu đề reset khi unmount (mặc định là tiêu đề ban đầu)
 */
export function useTitle(title, restore) {
    useEffect(() => {
        const oldTitle = document.title; // Lưu lại title hiện tại

        document.title = title; // Đổi title mới

        return () => {
            document.title = restore || oldTitle; // Khi component bị huỷ, trả lại title cũ
        };
    }, [title, restore]);
}
