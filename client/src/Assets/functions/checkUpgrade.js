import { toast } from "react-toastify";
import Silver from "../silver.png";
import Gold from "../gold.png";
import Platinum from "../platinum.png";
import Emrald from "../emrald.png";
import Ruby from "../ruby.png";
import Diamond from "../diamond.png";
import anim from "../anim1.gif";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

const badgeImages = {
  Silver: Silver,
  Gold: Gold,
  Platinum: Platinum,
  Emrald: Emrald,
  Ruby: Ruby,
  Diamond: Diamond,
};

const Msg = ({ closeToast, toastProps, badge }) => (
  <div className="flex flex-col items-center justify-center p-5 md:p-10">
    <img
      className="h-32 w-32 md:h-48 md:w-48"
      src={badgeImages[badge]}
      alt="badge"
    />
    <div className="text-base text-center mt-3 md:mt-5">
      Congrats! level upgraded to {badge}
    </div>
  </div>
);

const Pre = ({ closeToast, toastProps, badge }) => (
  <div className="flex items-center justify-center">
    <img src={anim} className=" w-78 h-78" alt="unlocked" />
  </div>
);

export const checkUpgrade = (oldPoints, newPoints) => {
  if (oldPoints < 500) {
    if (newPoints >= 500 && newPoints < 1000) {
      //bronze to silver
      toast(<Msg badge="Silver" />);
    }
  } else if (oldPoints < 1000) {
    if (newPoints >= 1000 && newPoints < 1500) {
      //silver to gold
      toast(<Pre badge="Gold" />, {
        onClose: () => toast(<Msg badge="Gold" />, { transition: Flip }),
        transition: Flip,
      });
      // toast(<Msg badge="Gold" />);
      // toast(<Msg badge="Gold" />);
    }
  } else if (oldPoints < 1500) {
    if (newPoints >= 1500 && newPoints < 2000) {
      //gold to platinum
      toast(<Msg badge="Platinum" />);
    }
  } else if (oldPoints < 2000) {
    if (newPoints >= 2000 && newPoints < 2500) {
      //platinum to emerald
      toast(<Msg badge="Emrald" />);
    }
  } else if (oldPoints < 2500) {
    if (newPoints >= 2500 && newPoints < 3000) {
      //emerald to ruby
      toast(<Msg badge="Ruby" />);
    }
  } else if (oldPoints < 3000) {
    if (newPoints >= 3000 && newPoints < 3500) {
      //ruby to diamond
      toast(<Msg badge="Diamond" />);
    }
  }
};
