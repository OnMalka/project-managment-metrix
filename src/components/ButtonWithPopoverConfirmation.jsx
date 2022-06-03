import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const ButtonWithPopoverConfirmation = ({
  onClick,
  mainVariant,
  mainText,
  yesVariant,
  noVariant,
  PerformAction,
  isPopoverDisabled,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onClickYes = () => {
    setShowConfirmation(false);
    PerformAction();
  };

  return (
    <OverlayTrigger
      delay={500}
      rootClose
      trigger="click"
      key="top"
      placement="top"
      show={showConfirmation}
      onToggle={() =>
        setShowConfirmation(!showConfirmation && !isPopoverDisabled)
      }
      overlay={
        <Popover id="popover-positioned-top">
          <Popover.Header as="h3">Are You Sure?</Popover.Header>
          <Popover.Body>
            <Button variant={yesVariant} onClick={onClickYes}>
              Yes
            </Button>
            <Button
              variant={noVariant}
              onClick={() => {
                setShowConfirmation(false);
              }}
            >
              No
            </Button>
          </Popover.Body>
        </Popover>
      }
    >
      <Button onClick={onClick} variant={mainVariant}>
        {mainText}
      </Button>
    </OverlayTrigger>
  );
};

export default ButtonWithPopoverConfirmation;
