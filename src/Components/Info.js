import { Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FcInfo } from "react-icons/fc";

function Info() {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="light"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
        >
          <Image ref={ref} src={<FcInfo />} />
          <span className="ms-3">Hover to see</span>
        </Button>
      )}
    </OverlayTrigger>
  );
}

export default Info;
