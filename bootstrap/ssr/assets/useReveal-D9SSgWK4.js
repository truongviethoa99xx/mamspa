import { r as reactExports } from "../ssr.js";
import { c as cn } from "./useLocale-DGbYLJ9C.js";
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return prefersReducedMotion;
}
function useReveal(options = {}) {
  const { threshold = 0 } = options;
  const ref = reactExports.useRef(null);
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const prefersReducedMotion = useReducedMotion();
  reactExports.useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // rootMargin dương mở rộng viewport xuống dưới 200px — kích hoạt animation TRƯỚC khi
      // section thật sự cuộn vào khung nhìn, để nó chạy song song với thời gian ảnh lazy-load
      // decode thay vì đợi ảnh xong rồi mới fade+trượt (cảm giác "lag" khi cuộn nhanh).
      { threshold, rootMargin: "0px 0px 200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold]);
  return { ref, className: cn("reveal", isVisible && "reveal-visible") };
}
export {
  useReducedMotion as a,
  useReveal as u
};
