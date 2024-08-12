import { toast } from "react-toastify";
import Badge from "../badge.jpg";
import anim from "../anim1.gif";
import { Flip } from "react-toastify";

const Msg = ({ closeToast, toastProps, name }) => (
  <div className="flex flex-col items-center justify-center p-5 md:p-10">
    <img className="h-32 w-32 md:h-48 md:w-48" src={Badge} alt="badge" />
    <div className="text-base text-center mt-3 md:mt-5">
      New achievement unlocked - {name}
    </div>
  </div>
);

const Pre = ({ closeToast, toastProps, badge }) => (
  <div className="flex items-center justify-center">
    <img src={anim} className=" w-78 h-78" alt="unlocked" />
  </div>
);

export const badgeAnim = (name) => {
  toast(<Pre />, {
    onClose: () => toast(<Msg name={name} />, { transition: Flip }),
    transition: Flip,
  });
};
