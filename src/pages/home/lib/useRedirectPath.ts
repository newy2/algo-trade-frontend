import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function useRedirectPath() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("pathname", pathname);
    if (pathname !== "/") {
      return;
    }

    const base64String = searchParams.get("redirect_path") || "";
    const redirectPath = decodeBase64(base64String);
    console.log("redirectPath", redirectPath);

    if (redirectPath.length === 0) {
      return;
    }

    navigation(redirectPath, {
      replace: true,
    });
  }, [pathname, navigation, searchParams]);
}

function decodeBase64(base64String: string) {
  try {
    return atob(base64String);
  } catch (e) {
    console.error(e);
    return "";
  }
}
