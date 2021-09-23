import React, { useState } from "react";

function ToggleButton({}) {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div class="toggleButton" onClick={() => setIsToggled((prev) => !prev)}>
      {isToggled}
    </div>
  );
}

export default ToggleButton;
