import { toast } from "react-toastify";
import Silver from "../silver.png";
import Gold from "../gold.png";
import Platinum from "../platinum.png";
import Emrald from "../emrald.png";
import Ruby from "../ruby.png";
import Diamond from "../diamond.png";

const badgeImages = {
  Silver: Silver,
  Gold: Gold,
  Platinum: Platinum,
  Emrald: Emrald,
  Ruby: Ruby,
  Diamond: Diamond,
};

const Msg = ({ closeToast, toastProps, badge }) => (
  <div className="flex items-center justify-center">
    <img className="h-8 w-8 mr-3" src={badgeImages[badge]} alt="gold" />
    <div className=" text-sm">Congrats! level upgraded to {badge}</div>
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
      //   toast.success("Congrats! Level upgraded to Gold");
      toast(<Msg badge="Gold" />);
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
