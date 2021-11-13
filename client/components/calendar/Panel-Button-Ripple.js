import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// import gsap from 'gsap'

// ==============================================

export default function Button_Ripple({label, setTabInFront, tab_in_front, tab}) {

  // --------------------------------------------
  // --------------------------------------------

  return (
    <button onClick={(event) => {
      const button = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }}>
      {label}
    </button>
  );
};

// ==============================================