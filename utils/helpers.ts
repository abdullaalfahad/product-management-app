import Cookies from "js-cookie";
import { logout } from "@/redux/slices/auth-slice";
import { store } from "@/redux/store";

export function generatePageNumbers(
  current: number,
  total: number,
): (number | "...")[] {
  const delta = 2;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("...");

  if (total > 1) range.push(total);

  return range;
}

export const handleLogout = () => {
  Cookies.remove("token");

  store.dispatch(logout());

  window.location.href = "/login";
};
