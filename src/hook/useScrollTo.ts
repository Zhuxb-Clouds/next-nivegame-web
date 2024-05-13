function heightToTop(ele: HTMLElement) {
  //ele为指定跳转到该位置的DOM节点
  let root = document.body;
  let height = 0;
  while (ele !== root) {
    height += ele.offsetTop;
    ele = ele.offsetParent as HTMLElement;
  }
  return height;
}
//某按钮点击时
export default function useScrollTo(e: React.MouseEvent<HTMLElement>) {
  window.scrollTo({
    top: heightToTop(e.target as HTMLElement),
    behavior: 'smooth'
  })
}
